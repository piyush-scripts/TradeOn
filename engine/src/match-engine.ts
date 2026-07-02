import db from "./db/client.js";
import { users, orders } from "./db/schema.js";
import { eq, inArray } from "drizzle-orm";
import { RedisClient } from "@/lib/redis.js";
import crypto from "crypto";

import type { OrderSide, OrderRecord, OrderBook } from "@/lib/types/orderbook.js";
import type { TradingCommand } from "@/lib/types/commands.js";
import type { EngineSnapshot, UserBalance } from "@/lib/types/snapshot.js";
import type { ExecutionRecord } from "@/lib/types/executions.js";

export type { ExecutionRecord }; // Export for compatibility with other engine modules

class MatchEngine {
  public balances: Map<string, UserBalance> = new Map();
  public orderBooks: Map<number, OrderBook> = new Map();
  private redisClient!: RedisClient;
  private lastAppliedCommandId = "0-0";
  private lastSequenceNumber = 0;
  private processedRequests = new Set<string>();

  constructor() {}

  private async replayCommands() {
    console.log("[MatchEngine/replayCommands]: Replaying actions from stream...");
    try {
      let count = 0;
      while (true) {
        const messages = await this.redisClient.readCommands(this.lastAppliedCommandId, null, 500);
        if (messages.length === 0) {
          break;
        }
        for (const msg of messages) {
          this.lastAppliedCommandId = msg.id;
          await this.processCommand(msg.command, false);
        }
        count += messages.length;
        if (messages.length < 500) {
          break;
        }
      }
      console.log(`[MatchEngine/replayCommands]: Replayed ${count} commands successfully.`);
    } catch (err: any) {
      console.error("[MatchEngine:replayCommands]: " + err.message);
    }
  }

  public async startup() {
    console.log("[MatchEngine/startup]: Starting Match Engine...");

    this.redisClient = await RedisClient.getInstance();

    const snapshot = await this.redisClient.getEngineSnapshot();
    if (snapshot) {
      console.log("[MatchEngine/startup]: Loading state from Redis snapshot...");
      this.lastAppliedCommandId = snapshot.lastAppliedCommandId;
      this.lastSequenceNumber = snapshot.lastSequenceNumber;
      this.processedRequests = new Set(snapshot.processedRequests || []);

      this.balances = new Map(Object.entries(snapshot.balances));

      const booksData = Object.entries(snapshot.orderBooks) as [string, OrderBook][];
      for (const [marketId, book] of booksData) {
        this.orderBooks.set(parseInt(marketId, 10), book);
      }
    } else {
      const allUsers = await db.select().from(users);
      for (const u of allUsers) {
        this.balances.set(u.clerkId, { available: u.balance, reserved: 0 });
      }

      const activeOrders = await db.select().from(orders).where(inArray(orders.status, ["pending", "partially_filled"]));
      for (const o of activeOrders) {
        if (!this.orderBooks.has(o.marketId)) {
          this.orderBooks.set(o.marketId, { yesOrders: [], noOrders: [] });
        }

        const userObj = allUsers.find(u => u.id === o.userId);
        if (!userObj) {
          continue;
        }

        const record: OrderRecord = {
          orderId: String(o.id),
          userId: userObj.clerkId,
          price: o.price,
          quantity: o.quantity - o.filledQty,
          timestamp: o.createdAt?.getTime() || Date.now()
        };

        const book = this.orderBooks.get(o.marketId)!;
        if (o.side === "YES") {
          book.yesOrders.push(record);
        } else {
          book.noOrders.push(record);
        }
      }

      for (const [marketId, book] of this.orderBooks.entries()) {
        book.yesOrders.sort((a, b) => b.price - a.price || a.timestamp - b.timestamp);
        book.noOrders.sort((a, b) => b.price - a.price || a.timestamp - b.timestamp);
        await this.redisClient.cacheOrderBook(marketId, book);
      }
    }

    await this.replayCommands();

    setInterval(() => this.saveSnapshot(), 5000);
    console.log("[MatchEngine/startup]: Match Engine Ready");
  }

  public async processLoop() {
    console.log("[MatchEngine/processLoop]: Listening for commands on stream:commands...");
    while (true) {
      try {
        const messages = await this.redisClient.readCommands(this.lastAppliedCommandId, 0, 100);
        for (const msg of messages) {
          this.lastAppliedCommandId = msg.id;
          await this.processCommand(msg.command, true);
        }
      } catch (err: any) {
        console.error("[MatchEngine:processLoop]: " + err.message);
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  private async processCommand(command: TradingCommand, emitEffects: boolean) {
    if (this.processedRequests.has(command.requestId)) {
      return;
    }
    this.processedRequests.add(command.requestId);

    if (command.type === "USER_SYNC") {
      const userId = command.userId;
      const balance = command.balance || 0;

      const current = this.balances.get(userId) || { available: 0, reserved: 0 };
      const newBal = { available: balance, reserved: current.reserved };
      this.balances.set(userId, newBal);
      console.log(`[MatchEngine:processCommand]: Synchronized user balance for ${userId}: ${balance}`);

      if (emitEffects) {
        try {
          await this.redisClient.cacheUserBalance(userId, newBal);
        } catch (err: any) {
          console.error("[MatchEngine:processCommand]: " + err.message);
        }
      }
    } else if (command.type === "ORDER_CREATE") {
      await this.processOrder(command, emitEffects);
    } else if (command.type === "ORDER_CANCEL") {
      await this.processCancel(command, emitEffects);
    }
  }

  private async processOrder(command: TradingCommand, emitEffects: boolean) {
    const userId = command.userId;
    const marketId = command.marketId;
    const side = command.side!;
    const price = command.price!;
    const quantity = command.quantity!;
    const clientOrderId = command.clientOrderId;

    const userBal = this.balances.get(userId) || { available: 0, reserved: 0 };
    const orderCost = price * quantity;

    if (userBal.available < orderCost) {
      console.error(`[MatchEngine:processOrder]: Order ${clientOrderId} rejected: Insufficient balance`);
      return;
    }

    userBal.available -= orderCost;
    userBal.reserved += orderCost;
    this.balances.set(userId, userBal);

    const affectedUserIds = new Set<string>([userId]);
    let remainingQty = quantity;
    const executions: ExecutionRecord[] = [];

    if (!this.orderBooks.has(marketId)) {
      this.orderBooks.set(marketId, { yesOrders: [], noOrders: [] });
    }

    const marketBook = this.orderBooks.get(marketId)!;
    const restingBookRef = side === "YES" ? marketBook.noOrders : marketBook.yesOrders;

    while (remainingQty > 0 && restingBookRef.length > 0) {
      const bestMaker = restingBookRef[0];

      if (price + bestMaker.price < 105) {
        break;
      }

      const matchQty = Math.min(remainingQty, bestMaker.quantity);
      const tradeId = crypto.randomUUID();

      const makerPrice = bestMaker.price;
      const takerPrice = 105 - bestMaker.price;

      const makerBal = this.balances.get(bestMaker.userId) || { available: 0, reserved: 0 };
      makerBal.reserved -= matchQty * makerPrice;
      this.balances.set(bestMaker.userId, makerBal);
      affectedUserIds.add(bestMaker.userId);

      const takerBal = this.balances.get(userId) || { available: 0, reserved: 0 };
      takerBal.reserved -= matchQty * price;
      takerBal.available += matchQty * (price - takerPrice);
      this.balances.set(userId, takerBal);

      const makerExec: ExecutionRecord = {
        executionId: crypto.randomUUID(),
        partitionId: 0,
        sequenceNumber: ++this.lastSequenceNumber,
        orderId: bestMaker.orderId,
        clientOrderId: bestMaker.orderId,
        tradeId,
        marketId,
        price: makerPrice,
        quantity: matchQty,
        userId: bestMaker.userId,
        side: side === "YES" ? "NO" : "YES",
        timestamp: Date.now()
      };

      const takerExec: ExecutionRecord = {
        executionId: crypto.randomUUID(),
        partitionId: 0,
        sequenceNumber: ++this.lastSequenceNumber,
        orderId: clientOrderId,
        clientOrderId: clientOrderId,
        tradeId,
        marketId,
        price: takerPrice,
        quantity: matchQty,
        userId,
        side,
        timestamp: Date.now()
      };

      executions.push(makerExec, takerExec);

      remainingQty -= matchQty;
      bestMaker.quantity -= matchQty;

      if (bestMaker.quantity === 0) {
        restingBookRef.shift();
      }
    }

    if (remainingQty > 0) {
      const newRecord: OrderRecord = {
        orderId: clientOrderId,
        userId,
        price,
        quantity: remainingQty,
        timestamp: command.timestamp
      };

      const ourBookRef = side === "YES" ? marketBook.yesOrders : marketBook.noOrders;
      ourBookRef.push(newRecord);
      ourBookRef.sort((a, b) => b.price - a.price || a.timestamp - b.timestamp);
    }

    if (emitEffects) {
      if (executions.length > 0) {
        const balanceUpdates = Array.from(affectedUserIds).map(uid => {
          const bal = this.balances.get(uid)!;
          return { userId: uid, available: bal.available, reserved: bal.reserved };
        });
        try {
          await this.redisClient.enqueueExecutions(this.lastSequenceNumber, executions, balanceUpdates);
        } catch (err: any) {
          console.error("[MatchEngine:processOrder]: " + err.message);
        }
      }

      // Write-through caching of live balances
      for (const uid of affectedUserIds) {
        const bal = this.balances.get(uid)!;
        try {
          await this.redisClient.cacheUserBalance(uid, bal);
        } catch (err: any) {
          console.error("[MatchEngine:processOrder]: " + err.message);
        }
      }

      try {
        await this.redisClient.cacheOrderBook(marketId, marketBook);
        await this.redisClient.publishMarketUpdate(marketId, marketBook);
      } catch (err: any) {
        console.error("[MatchEngine:processOrder]: " + err.message);
      }
    }
  }

  private async processCancel(command: TradingCommand, emitEffects: boolean) {
    const userId = command.userId;
    const marketId = command.marketId;
    const clientOrderId = command.clientOrderId;

    if (!this.orderBooks.has(marketId)) {
      console.error(`[MatchEngine:processCancel]: Market ${marketId} not found`);
      return;
    }

    const marketBook = this.orderBooks.get(marketId)!;
    let foundOrder: OrderRecord | null = null;
    let side: OrderSide = "YES";

    let index = marketBook.yesOrders.findIndex(o => o.orderId === clientOrderId && o.userId === userId);
    if (index !== -1) {
      foundOrder = marketBook.yesOrders[index];
      marketBook.yesOrders.splice(index, 1);
      side = "YES";
    } else {
      index = marketBook.noOrders.findIndex(o => o.orderId === clientOrderId && o.userId === userId);
      if (index !== -1) {
        foundOrder = marketBook.noOrders[index];
        marketBook.noOrders.splice(index, 1);
        side = "NO";
      }
    }

    if (!foundOrder) {
      console.error(`[MatchEngine:processCancel]: Active order ${clientOrderId} not found for user ${userId}`);
      return;
    }

    const userBal = this.balances.get(userId);
    if (userBal) {
      const reservedRelease = foundOrder.quantity * foundOrder.price;
      userBal.reserved -= reservedRelease;
      userBal.available += reservedRelease;
      this.balances.set(userId, userBal);
    }

    const cancelExec: ExecutionRecord = {
      executionId: crypto.randomUUID(),
      partitionId: 0,
      sequenceNumber: ++this.lastSequenceNumber,
      orderId: clientOrderId,
      clientOrderId: clientOrderId,
      tradeId: "CANCEL",
      marketId,
      price: foundOrder.price,
      quantity: foundOrder.quantity,
      userId,
      side,
      timestamp: Date.now()
    };

    const balanceUpdates = userBal ? [{ userId, available: userBal.available, reserved: userBal.reserved }] : [];

    if (emitEffects) {
      try {
        await this.redisClient.enqueueExecutions(this.lastSequenceNumber, [cancelExec], balanceUpdates);
      } catch (err: any) {
        console.error("[MatchEngine:processCancel]: " + err.message);
      }

      if (userBal) {
        try {
          await this.redisClient.cacheUserBalance(userId, userBal);
        } catch (err: any) {
          console.error("[MatchEngine:processCancel]: " + err.message);
        }
      }

      try {
        await this.redisClient.cacheOrderBook(marketId, marketBook);
        await this.redisClient.publishMarketUpdate(marketId, marketBook);
      } catch (err: any) {
        console.error("[MatchEngine:processCancel]: " + err.message);
      }
    }
  }

  private async saveSnapshot() {
    try {
      const snapshot: EngineSnapshot = {
        lastAppliedCommandId: this.lastAppliedCommandId,
        lastSequenceNumber: this.lastSequenceNumber,
        balances: Object.fromEntries(this.balances),
        orderBooks: Object.fromEntries(this.orderBooks),
        processedRequests: Array.from(this.processedRequests)
      };
      await this.redisClient.saveEngineSnapshot(snapshot);
      console.log("[MatchEngine:saveSnapshot]: Snapshot saved successfully at sequence " + this.lastSequenceNumber);

      await this.redisClient.trimCommandStream(this.lastAppliedCommandId);
    } catch (err: any) {
      console.error("[MatchEngine:saveSnapshot]: " + err.message);
    }
  }
}

export const engine = new MatchEngine();
