import type { OrderSide } from "./orderbook.js";

export type TxType = "deposit" | "trade" | "withdrawal";

export interface ExecutionRecord {
  executionId: string;
  partitionId: number;
  sequenceNumber: number;
  orderId: string;
  clientOrderId: string;
  tradeId: string;
  marketId: number;
  price: number;
  quantity: number;
  userId: string;
  side: OrderSide;
  timestamp: number;
}
