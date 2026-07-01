import "dotenv/config";
import db from "./db/client.js";
import { users } from "./db/schema.js";
import redis from "./redis/client.js";
import { eq } from "drizzle-orm";

async function main() {
    const clerkId = process.argv[2];
    if (!clerkId) {
        console.error("Usage: npm run seed-user <clerkId>");
        process.exit(1);
    }

    const initialBalance = 5000000; // ₹50,000 in cents

    console.log(`🌱 Seeding user ${clerkId} with balance ₹50,000.00...`);

    // 1. Insert/Update user in Postgres
    const existing = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
    if (existing[0]) {
        await db.update(users).set({ balanceCents: initialBalance }).where(eq(users.clerkId, clerkId));
        console.log("💾 Updated user balance in Postgres");
    } else {
        await db.insert(users).values({
            clerkId,
            balanceCents: initialBalance,
            email: "test@example.com",
        });
        console.log("💾 Created new user and balance in Postgres");
    }

    // 2. Push USER_SYNC command directly to Redis Match Engine Queue
    const syncPayload = {
        type: "USER_SYNC",
        userId: clerkId,
        balance: initialBalance,
    };

    await redis.rpush("queue:orders", JSON.stringify(syncPayload));
    console.log("⚡ Enqueued USER_SYNC balance mapping to Redis for Match Engine");

    console.log("🚀 User seeded successfully!");
    process.exit(0);
}

main().catch(console.error);
