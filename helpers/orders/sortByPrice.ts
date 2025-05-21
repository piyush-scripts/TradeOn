import { Order } from "@/types/types";

export default function sortOrderByPrice(
    orders: Order[],
    side : "bid" | "ask"
): Order[] {
    if(side === "ask") return orders.sort((a,b) => b.price - a.price)
    else return orders.sort((a,b) => a.price - a.price) 
}