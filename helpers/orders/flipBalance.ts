import db from "@/db/client";
import { Holdings } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

export default async function flipBalance(orderrer: string, nonorderrer: string, itemId: number, quantity: number, side: "ask" | "bid") {
    //bidder = yes = orderrer
    const orderrerEntryFound = await db.select().from(Holdings).where(and(eq(Holdings.userName, orderrer), eq(Holdings.itemId, itemId)))

    console.info(orderrerEntryFound)

    if (orderrerEntryFound[0]) {
        await db.update(Holdings)
            .set({ quantity: quantity, itemSupporting: side })
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
    // Non orderrer changes
    // asker = no = nonorderrer
    const nonorderrerEntryFound = await db.select().from(Holdings).where(and(eq(Holdings.userName, nonorderrer), eq(Holdings.itemId, itemId)))
    
    console.info(nonorderrerEntryFound)
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
    console.info("seller updated")
}

