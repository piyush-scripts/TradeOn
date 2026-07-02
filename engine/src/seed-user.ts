import "dotenv/config";
import db from "./db/client.js";
import { users } from "./db/schema.js";
import { RedisClient } from "@/lib/redis.js";
import { eq } from "drizzle-orm";
import crypto from "crypto";

async function main() {
    const clerkId = process.argv[2];
    if (!clerkId) {
        console.error("[seed-user:main]: Usage: npm run seed-user <clerkId>");
        process.exit(1);
    }

    const initialBalance = 5000000; // ₹50,000.00 (in paise/cents)

    console.log(`🌱 Seeding user ${clerkId} with balance ₹50,000.00...`);

    // 1. Insert/Update user in Postgres
    try {
        const existing = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
        if (existing[0]) {
            await db.update(users).set({ balance: initialBalance }).where(eq(users.clerkId, clerkId));
            console.log("💾 Updated user balance in Postgres");
        } else {
            await db.insert(users).values({
                clerkId,
                balance: initialBalance,
                email: "test@example.com",
            });
            console.log("💾 Created new user and balance in Postgres");
        }
    } catch (err: any) {
        console.error("[seed-user:main]: Postgres operation failed: " + err.message);
        process.exit(1);
    }

    // 2. Push USER_SYNC command directly to Redis Match Engine Command Stream
    try {
        const redisClient = await RedisClient.getInstance();
        await redisClient.enqueueCommand({
            requestId: crypto.randomUUID(),
            clientOrderId: crypto.randomUUID(),
            userId: clerkId,
            marketId: 0,
            type: "USER_SYNC",
            balance: initialBalance,
            timestamp: Date.now(),
        });
        console.log("⚡ Enqueued USER_SYNC balance mapping to Redis Stream");
    } catch (err: any) {
        console.error("[seed-user:main]: Redis stream operation failed: " + err.message);
        process.exit(1);
    }

    console.log("🚀 User seeded successfully!");
    process.exit(0);
}

main().catch((err) => {
    console.error("[seed-user:main]: Seeding crashed: " + err.message);
});
