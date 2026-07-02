import type { OrderSide } from "./orderbook.js";

export type CommandType = "ORDER_CREATE" | "ORDER_CANCEL" | "USER_SYNC";

export interface TradingCommand {
  requestId: string;
  clientOrderId: string;
  userId: string;
  marketId: number;
  type: CommandType;
  side?: OrderSide;
  price?: number;
  quantity?: number;
  balance?: number;
  timestamp: number;
}
