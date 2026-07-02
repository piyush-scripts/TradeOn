import type { OrderBook } from "./orderbook.js";

export type MarketStatus = "open" | "resolved";

export interface UserBalance {
  available: number;
  reserved: number;
}

export interface EngineSnapshot {
  lastAppliedCommandId: string;
  lastSequenceNumber: number;
  balances: Record<string, UserBalance>;
  orderBooks: Record<number, OrderBook>;
  processedRequests: string[];
}
