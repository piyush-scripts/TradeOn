import "dotenv/config";
import db from "./db/client.js";
import { RedisClient } from "@/lib/redis.js";
import { users, transactions, positions, orders, processedOffsets } from "./db/schema.js";
import { eq, sql } from "drizzle-orm";
import type { ExecutionRecord } from "@/lib/types/executions.js";

async function runWorker() {
  console.log("💾 Persistence Worker started. Listening on stream:events");

  let redisClient: RedisClient;
  try {
    redisClient = await RedisClient.getInstance();
  } catch (err: any) {
    console.error("[PersistenceWorker:runWorker]: Failed to initialize Redis Client: " + err.message);
    process.exit(1);
  }

  // 1. Recover last processed offset from database
  let lastSeenId = "0-0";
  try {
    const offsetRow = await db.select({ lastSeenId: processedOffsets.lastSeenId })
      .from(processedOffsets)
      .where(eq(processedOffsets.serviceName, "persistence-worker"))
      .limit(1);

    if (offsetRow[0]) {
      lastSeenId = offsetRow[0].lastSeenId;
    }
    console.log(`[PersistenceWorker:runWorker]: Resuming event consumption from offset: ${lastSeenId}`);
  } catch (err: any) {
    console.error("[PersistenceWorker:runWorker]: Failed to load offset: " + err.message);
  }

  // 2. Continuous Event Processing Loop
  while (true) {
    try {
      const events = await redisClient.readExecutions(lastSeenId, 0, 100);
      if (events.length === 0) {
        continue;
      }

      for (const event of events) {
        // Run all updates + offset commit atomically inside a SQL transaction
        await db.transaction(async (tx) => {
          // 2a. Update User Balances directly to match MatchEngine state
          for (const bal of event.balanceUpdates) {
            await tx.update(users)
              .set({
                balance: bal.available,
                reservedBalance: bal.reserved
              })
              .where(eq(users.clerkId, bal.userId));
          }

          // 2b. Process Executions (Matches & Cancels)
          for (const exec of event.executions) {
            const userRow = await tx.select({ id: users.id })
              .from(users)
              .where(eq(users.clerkId, exec.userId))
              .limit(1);

            if (!userRow[0]) {
              console.error(`[PersistenceWorker:runWorker]: User ${exec.userId} not found in database`);
              continue;
            }
            const internalUserId = userRow[0].id;

            if (exec.tradeId === "CANCEL") {
              // Order Cancellation Event
              await tx.update(orders)
                .set({ status: "canceled" })
                .where(eq(orders.id, exec.orderId));

              // Record cancellation transaction
              await tx.insert(transactions).values({
                userId: internalUserId,
                orderId: exec.orderId,
                amountChange: exec.price * exec.quantity,
                type: "trade"
              });
            } else {
              // Trade Execution Event (Fill)
              // Upsert the order record on fill
              await tx.insert(orders).values({
                id: exec.orderId,
                userId: internalUserId,
                marketId: exec.marketId,
                side: exec.side,
                price: exec.price,
                quantity: exec.quantity,
                filledQty: exec.quantity,
                status: "filled"
              }).onConflictDoUpdate({
                target: [orders.id],
                set: {
                  filledQty: sql`${orders.filledQty} + ${exec.quantity}`,
                  status: "filled"
                }
              });

              // Record transaction change for trade cost
              await tx.insert(transactions).values({
                userId: internalUserId,
                orderId: exec.orderId,
                amountChange: exec.price * -1 * exec.quantity,
                type: "trade"
              });

              // Update user position
              await tx.insert(positions).values({
                userId: internalUserId,
                marketId: exec.marketId,
                sharesYes: exec.side === "YES" ? exec.quantity : 0,
                sharesNo: exec.side === "NO" ? exec.quantity : 0,
              }).onConflictDoUpdate({
                target: [positions.userId, positions.marketId],
                set: {
                  sharesYes: sql`${positions.sharesYes} + ${exec.side === "YES" ? exec.quantity : 0}`,
                  sharesNo: sql`${positions.sharesNo} + ${exec.side === "NO" ? exec.quantity : 0}`,
                }
              });
            }
          }

          // 2c. Persist the stream ID offset
          await tx.insert(processedOffsets).values({
            serviceName: "persistence-worker",
            lastSeenId: event.id
          }).onConflictDoUpdate({
            target: [processedOffsets.serviceName],
            set: { lastSeenId: event.id, updatedAt: new Date() }
          });
        });

        lastSeenId = event.id;
      }

      console.log(`[PersistenceWorker:runWorker]: Synced ${events.length} events successfully to Postgres`);
    } catch (err: any) {
      console.error("[PersistenceWorker:runWorker]: " + err.message);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

runWorker();
