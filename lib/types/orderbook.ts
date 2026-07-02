export type OrderSide = "YES" | "NO";

export type OrderStatus =
  | "NEW"
  | "ACCEPTED"
  | "RESERVED"
  | "PARTIALLY_FILLED"
  | "FILLED"
  | "CANCEL_PENDING"
  | "CANCELLED"
  | "REJECTED"
  | "EXPIRED";

export interface OrderRecord {
  orderId: string;
  userId: string;
  price: number;
  quantity: number;
  timestamp: number;
}

export interface OrderBook {
  yesOrders: OrderRecord[];
  noOrders: OrderRecord[];
}
