import db from "@/db/client";
import { users } from "@/db/schema";
import { sql , eq } from "drizzle-orm";


export default async function updateBalance(name: string, price: number, quantity: number) {

    await db.update(users)
    .set({balance : sql`${users.balance} - ${quantity*price}`})
    .where(eq(users.name,name))
    console.info("done")
}
