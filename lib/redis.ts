import "dotenv/config";
import { createClient } from "redis";
import type { TradingCommand } from "./types/commands.js";
import type { ExecutionRecord } from "./types/executions.js";
import type { EngineSnapshot, UserBalance } from "./types/snapshot.js";
import type { OrderBook } from "./types/orderbook.js";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export class RedisClient {
  private static instance: RedisClient | null = null;
  private redis: ReturnType<typeof createClient>;
  private commandStream = "stream:commands";
  private eventStream = "stream:events";
  private snapshotKey = "snapshot:engine_state";

  private constructor() {
    this.redis = createClient({
      url: REDIS_URL,
    });

    this.redis.on("connect", () => console.log("[RedisClient:constructor]: Redis connected"));
    this.redis.on("error", (err) => console.error("[RedisClient:constructor]: " + err.message));
  }

  public static async getInstance(): Promise<RedisClient> {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
      await RedisClient.instance.redis.connect();
    }
    return RedisClient.instance;
  }

  async enqueueCommand(command: TradingCommand): Promise<string> {
    return await this.redis.xAdd(
      this.commandStream,
      "*",
      { payload: JSON.stringify(command) }
    );
  }

  async readCommands(
    lastSeenId: string,
    blockMs: number | null = 0,
    count = 100
  ): Promise<{ id: string; command: TradingCommand }[]> {
    const options: any = {};
    if (count !== null) options.COUNT = count;
    if (blockMs !== null) options.BLOCK = blockMs;

    const result = await this.redis.xRead(
      [{ key: this.commandStream, id: lastSeenId }],
      options
    );
    // @ts-ignore
    if (!result || result.length === 0) return [];

    // @ts-ignore
    return result[0].messages.map((msg) => ({
      id: msg.id,
      command: JSON.parse(msg.message.payload),
    }));
  }

  async enqueueExecutions(
    sequenceNumber: number,
    executions: ExecutionRecord[],
    balanceUpdates: { userId: string; available: number; reserved: number }[] = []
  ): Promise<string> {
    return await this.redis.xAdd(
      this.eventStream,
      "*",
      {
        sequenceNumber: String(sequenceNumber),
        executions: JSON.stringify(executions),
        balanceUpdates: JSON.stringify(balanceUpdates),
      }
    );
  }

  async readExecutions(
    lastSeenId: string,
    blockMs: number | null = 0,
    count = 100
  ): Promise<{ id: string; sequenceNumber: number; executions: ExecutionRecord[]; balanceUpdates: { userId: string; available: number; reserved: number }[] }[]> {
    const options: any = {};
    if (count !== null) options.COUNT = count;
    if (blockMs !== null) options.BLOCK = blockMs;

    const result = await this.redis.xRead(
      [{ key: this.eventStream, id: lastSeenId }],
      options
    );
    // @ts-ignore
    if (!result || result.length === 0) return [];

    // @ts-ignore
    return result[0].messages.map((msg) => {
      const sequenceNumber = parseInt(msg.message.sequenceNumber, 10);
      const executions = JSON.parse(msg.message.executions);
      const balanceUpdates = msg.message.balanceUpdates ? JSON.parse(msg.message.balanceUpdates) : [];
      return { id: msg.id, sequenceNumber, executions, balanceUpdates };
    });
  }

  async acquireIdempotencyLock(requestId: string, expireSeconds = 86400): Promise<boolean> {
    const key = `dedup:${requestId}`;
    const result = await this.redis.set(key, "1", {
      NX: true,
      EX: expireSeconds,
    });
    return result === "OK";
  }

  async saveEngineSnapshot(snapshot: EngineSnapshot): Promise<void> {
    await this.redis.set(this.snapshotKey, JSON.stringify(snapshot));
  }

  async getEngineSnapshot(): Promise<EngineSnapshot | null> {
    const raw = await this.redis.get(this.snapshotKey);
    return raw ? JSON.parse(raw) : null;
  }

  async cacheOrderBook(marketId: number, book: OrderBook): Promise<void> {
    await this.redis.set(`orderbook:${marketId}`, JSON.stringify(book));
  }

  async publishMarketUpdate(marketId: number, book: OrderBook): Promise<void> {
    await this.redis.publish("pubsub:market_updates", JSON.stringify({ marketId, book }));
  }

  async getCachedOrderBook(marketId: number): Promise<OrderBook | null> {
    const raw = await this.redis.get(`orderbook:${marketId}`);
    return raw ? JSON.parse(raw) : null;
  }

  async cacheUserBalance(userId: string, balance: UserBalance): Promise<void> {
    await this.redis.set(`balance:${userId}`, JSON.stringify(balance));
  }

  async getCachedUserBalance(userId: string): Promise<UserBalance | null> {
    const raw = await this.redis.get(`balance:${userId}`);
    return raw ? JSON.parse(raw) : null;
  }

  async trimCommandStream(lastAppliedId: string): Promise<number> {
    return await this.redis.xTrim(this.commandStream, "MINID", lastAppliedId);
  }

  async getCommandStreamLength(): Promise<number> {
    return await this.redis.xLen(this.commandStream);
  }

  getClientInstance() {
    return this.redis;
  }
}