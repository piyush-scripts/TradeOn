import db from "./db/client.js";
import { users, orders } from "./db/schema.js";
import redis from "./redis/client.js";
import { eq, inArray } from "drizzle-orm";
import fs from "fs";
import path from "path";

type Side = "YES" | "NO";

export interface QueuedOrder {
    orderId: string;
    userId: string;
    marketId: number;
    side: Side;
    priceCents: number;
    quantity: number;
    timestamp: number;
}

export interface OrderRecord {
    orderId: string;
    userId: string;
    priceCents: number;
    quantity: number;
    timestamp: number;
}

export interface OrderBook {
    yesOrders: OrderRecord[];
    noOrders: OrderRecord[];
}

export interface ExecutionRecord {
    makerOrderId: string;
    takerOrderId: string;
    makerUserId: string;
    takerUserId: string;
    marketId: number;
    sideMaker: Side;
    sideTaker: Side;
    priceCentsMaker: number;
    priceCentsTaker: number;
    quantity: number;
    timestamp: number;
}

class MatchEngine {
    public balances: Map<string, number> = new Map();
    public orderBooks: Map<number, OrderBook> = new Map();
    private aofPath = path.join(process.cwd(), "engine.aof");

    constructor() { }

    private async replayAOF() {
        if (!fs.existsSync(this.aofPath)) {
            console.log("📄 No AOF file found.");
            return;
        }

        console.log("📄 Replaying actions from AOF file...");
        try {
            const data = fs.readFileSync(this.aofPath, "utf-8");
            const lines = data.split("\n").filter(line => line.trim() !== "");
            for (const line of lines) {
                const payload = JSON.parse(line);
                if (payload.type === "USER_SYNC") {
                    this.balances.set(payload.userId, payload.balance);
                    console.log(`[AOF Replay] Synchronized user balance for ${payload.userId}: ${payload.balance}`);
                } else {
                    this.processOrder(payload);
                    console.log(`[AOF Replay] Processed order ${payload.orderId}`);
                }
            }
            console.log(`✅ Replayed ${lines.length} actions from AOF successfully.`);
        } catch (err) {
            console.error("❌ Failed to replay AOF:", err);
        }
    }

    public async startup() {
        console.log("🚀 Starting Match Engine...");

        const snapshotRaw = await redis.get("snapshot:engine_state");
        if (snapshotRaw) {
            console.log("📥 Loading state from Redis snapshot...");
            const snapshot = JSON.parse(snapshotRaw);
            this.balances = new Map(Object.entries(snapshot.balances));

            const booksData = Object.entries(snapshot.orderBooks) as [string, any][];
            for (const [marketId, book] of booksData) {
                this.orderBooks.set(parseInt(marketId, 10), book as OrderBook);
            }
        } else {
            console.log("🗄️ No Redis snapshot found. Bootstrapping from Postgres...");
            const allUsers = await db.select().from(users);
            for (const u of allUsers) {
                this.balances.set(u.clerkId, u.balanceCents);
            }

            // Load all pending/partially_filled orders
            const activeOrders = await db.select().from(orders).where(inArray(orders.status, ["pending", "partially_filled"]));
            for (const o of activeOrders) {
                if (!this.orderBooks.has(o.marketId)) {
                    this.orderBooks.set(o.marketId, { yesOrders: [], noOrders: [] });
                }

                const userObj = allUsers.find(u => u.id === o.userId);
                if (!userObj) continue;

                const record: OrderRecord = {
                    orderId: String(o.id),
                    userId: userObj.clerkId,
                    priceCents: o.priceCents,
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

            // Sort all books descending
            for (const [marketId, book] of this.orderBooks.entries()) {
                book.yesOrders.sort((a, b) => b.priceCents - a.priceCents || a.timestamp - b.timestamp);
                book.noOrders.sort((a, b) => b.priceCents - a.priceCents || a.timestamp - b.timestamp);
                await redis.set(`orderbook:${marketId}`, JSON.stringify(book));
            }
        }

        // Replay any AOF records written after snapshot or since boot
        await this.replayAOF();

        // Start Snapshot interval
        setInterval(() => this.saveSnapshot(), 5000);
        console.log("✅ Match Engine Ready");
    }

    public async processLoop() {
        console.log("👂 Listening for orders on queue:orders...");
        while (true) {
            try {
                const item = await redis.blpop("queue:orders", 0);
                if (!item) continue;

                // Log to AOF on disk for durability
                try {
                    fs.appendFileSync(this.aofPath, item[1] + "\n");
                } catch (fsErr) {
                    console.error("❌ AOF write failed:", fsErr);
                }

                const payload = JSON.parse(item[1]);
                if (payload.type === "USER_SYNC") {
                    const userId = payload.userId;
                    const balance = payload.balance;

                    // 1. Update internal RAM map
                    this.balances.set(userId, balance);
                    console.log(`👤 Synchronized user balance in Match Engine RAM for ${userId}: ${balance}`);

                    // 2. Persist to Postgres database (cold storage)
                    const existing = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1);
                    if (existing[0]) {
                        await db.update(users).set({ balanceCents: balance }).where(eq(users.clerkId, userId));
                    } else {
                        await db.insert(users).values({
                            clerkId: userId,
                            balanceCents: balance
                        });
                    }
                    console.log(`💾 Saved synchronized user ${userId} to Postgres`);
                } else {
                    this.processOrder(payload);
                }
            } catch (err) {
                console.error("❌ Process Loop Error:", err);
            }
        }
    }

    private processOrder(order: QueuedOrder) {
        // 1. Balance Check
        const userBal = this.balances.get(order.userId) || 0;
        const orderCost = order.priceCents * order.quantity;

        if (userBal < orderCost) {
            // Reject synchronously
            console.log(`❌ Order ${order.orderId} rejected: Insufficient balance`);
            return;
        }

        // Deduct cost UPFRONT (collateral)
        this.balances.set(order.userId, userBal - orderCost);

        // 2. Matching Engine
        let remainingQty = order.quantity;
        const executions: ExecutionRecord[] = [];

        if (!this.orderBooks.has(order.marketId)) {
            this.orderBooks.set(order.marketId, { yesOrders: [], noOrders: [] });
        }

        const marketBook = this.orderBooks.get(order.marketId)!;

        // Determine the resting book to match against
        const restingBookRef = order.side === "YES" ? marketBook.noOrders : marketBook.yesOrders;

        while (remainingQty > 0 && restingBookRef.length > 0) {
            const bestMaker = restingBookRef[0];

            // Does it cross?
            // YES + NO >= 105 for a match
            if (order.priceCents + bestMaker.priceCents < 105) {
                break; // No match
            }

            // Match found
            const matchQty = Math.min(remainingQty, bestMaker.quantity);

            const execution: ExecutionRecord = {
                makerOrderId: bestMaker.orderId,
                takerOrderId: order.orderId,
                makerUserId: bestMaker.userId,
                takerUserId: order.userId,
                marketId: order.marketId,
                sideMaker: order.side === "YES" ? "NO" : "YES",
                sideTaker: order.side,
                priceCentsMaker: bestMaker.priceCents,
                priceCentsTaker: 105 - bestMaker.priceCents,
                quantity: matchQty,
                timestamp: Date.now()
            };
            executions.push(execution);

            // Adjust remaining quantities
            remainingQty -= matchQty;
            bestMaker.quantity -= matchQty;

            // If maker is filled fully, remove them from orderbook
            if (bestMaker.quantity === 0) {
                restingBookRef.shift();
            }
        }

        // 3. Add remainder to Order Book
        if (remainingQty > 0) {
            const newRecord: OrderRecord = {
                orderId: order.orderId,
                userId: order.userId,
                priceCents: order.priceCents,
                quantity: remainingQty,
                timestamp: order.timestamp,
            };

            const ourBookRef = order.side === "YES" ? marketBook.yesOrders : marketBook.noOrders;
            ourBookRef.push(newRecord);

            // Re-sort descending by price, then ascending by time (price/time priority)
            ourBookRef.sort((a, b) => b.priceCents - a.priceCents || a.timestamp - b.timestamp);
        }

        // 4. Emit side effects (async pushes to redis without awaiting in the match logic)
        this.emitSideEffects(order.marketId, executions);
    }

    private emitSideEffects(marketId: number, executions: ExecutionRecord[]) {
        // We swallow promises here as Node.js handles I/O asynchronously and we must not block the loop.
        if (executions.length > 0) {
            redis.rpush("queue:db_writes", JSON.stringify(executions)).catch(console.error);
        }

        // Publish order book state
        const book = this.orderBooks.get(marketId);
        if (book) {
            redis.publish("pubsub:market_updates", JSON.stringify({ marketId, book })).catch(console.error);
            redis.set(`orderbook:${marketId}`, JSON.stringify(book)).catch(console.error);
        }
    }

    private async saveSnapshot() {
        try {
            const snapshot = {
                balances: Object.fromEntries(this.balances),
                orderBooks: Object.fromEntries(this.orderBooks),
            };
            await redis.set("snapshot:engine_state", JSON.stringify(snapshot));

            // Truncate AOF file upon successful snapshot to prevent it from growing infinitely
            try {
                fs.writeFileSync(this.aofPath, "");
                console.log("💾 AOF log truncated successfully after snapshot.");
            } catch (aofErr) {
                console.error("⚠️ Failed to truncate AOF file:", aofErr);
            }
        } catch (err) {
            console.error("❌ Snapshot Error:", err);
        }
    }
}

// ─── Entry Point ──────────────────────────────────────────

export const engine = new MatchEngine();
