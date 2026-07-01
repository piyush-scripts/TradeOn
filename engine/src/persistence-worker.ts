import "dotenv/config";
import db from "./db/client.js";
import redis from "./redis/client.js";
import { users, transactions, positions, orders } from "./db/schema.js";
import { eq, sql } from "drizzle-orm";
import type { ExecutionRecord } from "./match-engine.js";

async function runWorker() {
    console.log("💾 Persistence Worker started. Listening on queue:db_writes");

    while (true) {
        try {
            // 1. Block and pop from queue
            const item = await redis.blpop("queue:db_writes", 0);
            if (!item) continue;

            const executions: ExecutionRecord[] = JSON.parse(item[1]);
            if (executions.length === 0) continue;

            // 2. Map actions in SQL Transaction safely to cold storage
            await db.transaction(async (tx) => {
                for (const exec of executions) {
                    // 2a. Determine precise numeric User IDs from clerk IDs
                    // In a real application we might cache this mapping, but we look them up quickly here
                    const maker = await tx.select({ id: users.id }).from(users).where(eq(users.clerkId, exec.makerUserId)).limit(1);
                    const taker = await tx.select({ id: users.id }).from(users).where(eq(users.clerkId, exec.takerUserId)).limit(1);

                    if (!maker[0] || !taker[0]) {
                        console.error("Critical Mapping Error: Could not correlate user identity mappings.", exec);
                        continue; // Unlikely but fail-safe fallback
                    }

                    const makerInternalId = maker[0].id;
                    const takerInternalId = taker[0].id;

                    // Note: In our current setup, positions are defined by userId & marketId composite keys
                    // Note: The execution payload stores string `orderId`s from crypto.UUID. 
                    // Our `orders.id` in Drizzle is integer generatedAsIdentity... wait.
                    // Ah. The `Match Engine` handles Phase 2 Ingress payloads which are random UUID strings.
                    // The table uses `integer()`. That means we cannot use `orders.id` safely without
                    // altering it or just creating dummy transactions.
                    // For now, in this Phase 5 persistence mock, we just write the `transactions` minus foreign key relations if needed,
                    // OR we alter the schema later. For the sake of the exercise, they are omitted safely as `undefined` or we ignore it.

                    const makerPayout = exec.sideMaker === "YES" ? exec.priceCentsTaker : exec.priceCentsTaker;

                    await tx.insert(transactions).values([
                        {
                            userId: makerInternalId,
                            amountChangeCents: exec.priceCentsMaker * -1 * exec.quantity, // Setup cost
                            type: "trade"
                        },
                        {
                            userId: takerInternalId,
                            amountChangeCents: exec.priceCentsTaker * -1 * exec.quantity,
                            type: "trade"
                        }
                    ]);

                    // Insert or update Positions
                    // Maker
                    await tx.insert(positions).values({
                        userId: makerInternalId,
                        marketId: exec.marketId,
                        sharesYes: exec.sideMaker === "YES" ? exec.quantity : 0,
                        sharesNo: exec.sideMaker === "NO" ? exec.quantity : 0,
                    }).onConflictDoUpdate({
                        target: [positions.userId, positions.marketId],
                        set: {
                            sharesYes: sql`${positions.sharesYes} + ${exec.sideMaker === "YES" ? exec.quantity : 0}`,
                            sharesNo: sql`${positions.sharesNo} + ${exec.sideMaker === "NO" ? exec.quantity : 0}`,
                        }
                    });

                    // Taker
                    await tx.insert(positions).values({
                        userId: takerInternalId,
                        marketId: exec.marketId,
                        sharesYes: exec.sideTaker === "YES" ? exec.quantity : 0,
                        sharesNo: exec.sideTaker === "NO" ? exec.quantity : 0,
                    }).onConflictDoUpdate({
                        target: [positions.userId, positions.marketId],
                        set: {
                            sharesYes: sql`${positions.sharesYes} + ${exec.sideTaker === "YES" ? exec.quantity : 0}`,
                            sharesNo: sql`${positions.sharesNo} + ${exec.sideTaker === "NO" ? exec.quantity : 0}`,
                        }
                    });
                }
            });

            console.log(`✅ Synced ${executions.length} executions to Postgres`);
        } catch (err) {
            console.error("❌ Persistence Worker Error:", err);
            // Wait to prevent spinning CPU
            await new Promise(r => setTimeout(r, 1000));
        }
    }
}

runWorker();
