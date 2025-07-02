import { Order } from "@/app/api/(main)/placeOrder/types";

export default function sortOrderByPrice(
    orders: Order[],
    
): Order[] {
    return orders.sort((a,b) => a.price - b.price) 
}