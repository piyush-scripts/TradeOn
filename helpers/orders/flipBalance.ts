import db from "@/db/client";
import { Holdings } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import updateBalance from "./updateBalance";

export default async function flipBalance(orderrer: string, nonorderrer: string, itemId: number, quantity: number, side: "ask" | "bid",price:number) {
    //bidder = yes = orderrer
    const orderrerEntryFound = await db.select().from(Holdings).where(and(eq(Holdings.userName, orderrer), eq(Holdings.itemId, itemId)))

    console.info(orderrerEntryFound)

    if (orderrerEntryFound[0]) {
        await db.update(Holdings)
            .set({ quantity: sql`${Holdings.quantity} + ${quantity}`, itemSupporting: side })
            .where(and(eq(Holdings.userName, orderrer), eq(Holdings.itemId, itemId)))
    }
    else {
        await db.insert(Holdings).values({

            userName: orderrer,
            itemId: itemId,
            quantity: quantity,
            itemSupporting: side

        })
    }
    updateBalance(orderrer,price,quantity,"buy");
    // Non orderrer changes
    // asker = no = nonorderrer
    const nonorderrerEntryFound = await db.select().from(Holdings).where(and(eq(Holdings.userName, nonorderrer), eq(Holdings.itemId, itemId)))
    
    if (nonorderrerEntryFound[0]) {
        await db.update(Holdings)
            .set({ quantity: sql`${Holdings.quantity} + ${quantity}` , itemSupporting: side })
            .where(and(eq(Holdings.userName, nonorderrer), eq(Holdings.itemId, itemId)))
    
    }
    else {
        await db.insert(Holdings).values({

            userName: nonorderrer,
            itemId: itemId,
            quantity: quantity,
            itemSupporting: side

        })
    }
    updateBalance(nonorderrer,price,quantity,"buy");
}

