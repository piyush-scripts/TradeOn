import "dotenv/config";
import db from "./db/client.js";
import { users, markets } from "./db/schema.js";
import { RedisClient } from "@/lib/redis.js";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export const BOT_USERS = [
    { clerkId: "bot_yes_alpha", email: "bot_yes_alpha@tradeon.internal" },
    { clerkId: "bot_yes_beta", email: "bot_yes_beta@tradeon.internal" },
    { clerkId: "bot_no_alpha", email: "bot_no_alpha@tradeon.internal" },
    { clerkId: "bot_no_beta", email: "bot_no_beta@tradeon.internal" },
    { clerkId: "bot_mm_alpha", email: "bot_mm_alpha@tradeon.internal" },
    { clerkId: "bot_mm_beta", email: "bot_mm_beta@tradeon.internal" },
];

const INITIAL_BOT_BALANCE = 10000000; // ₹100,000.00 (in paise)

export const INITIAL_MARKETS = [
    { id: 1, question: "Will Bitcoin reach $100k by December 2026?", status: "open" as const },
    { id: 2, question: "Will AI pass the Turing test in 2026?", status: "open" as const },
    { id: 3, question: "Will the Fed cut interest rates in Q4?", status: "open" as const },
    { id: 4, question: "Will GTA 6 release on schedule?", status: "open" as const },
];

export async function seedZeroState() {
    console.log("🌱 Starting Zero-State Seeding...");

    // 1. Ensure Markets Exist in Postgres
    console.log("📦 Initializing markets...");
    for (const m of INITIAL_MARKETS) {
        const existing = await db.select().from(markets).where(eq(markets.id, m.id)).limit(1);
        if (!existing[0]) {
            await db.insert(markets).values({
                question: m.question,
                status: m.status,
            });
            console.log(`   + Created Market #${m.id}: "${m.question}"`);
        } else {
            console.log(`   ✓ Market #${m.id} already exists`);
        }
    }

    // 2. Seed Bot Users in Postgres
    console.log("🤖 Initializing Bot Accounts in Postgres...");
    for (const bot of BOT_USERS) {
        const existing = await db.select().from(users).where(eq(users.clerkId, bot.clerkId)).limit(1);
        if (existing[0]) {
            await db.update(users)
                .set({ balance: INITIAL_BOT_BALANCE, reservedBalance: 0 })
                .where(eq(users.clerkId, bot.clerkId));
            console.log(`   ✓ Reset balance for ${bot.clerkId}`);
        } else {
            await db.insert(users).values({
                clerkId: bot.clerkId,
                email: bot.email,
                balance: INITIAL_BOT_BALANCE,
                reservedBalance: 0,
            });
            console.log(`   + Registered bot user ${bot.clerkId}`);
        }
    }

    // 3. Reset Redis Orderbooks to Zero State (50-50 / empty orderbooks) & Sync Balances
    console.log("⚡ Resetting Redis state to zero state & syncing balances...");
    const redisClient = await RedisClient.getInstance();

    for (const m of INITIAL_MARKETS) {
        const zeroBook = { yesOrders: [], noOrders: [] };
        await redisClient.cacheOrderBook(m.id, zeroBook);
        await redisClient.publishMarketUpdate(m.id, zeroBook);
        console.log(`   🧹 Orderbook for Market #${m.id} reset to zero state`);
    }

    for (const bot of BOT_USERS) {
        await redisClient.cacheUserBalance(bot.clerkId, {
            available: INITIAL_BOT_BALANCE,
            reserved: 0,
        });

        await redisClient.enqueueCommand({
            requestId: crypto.randomUUID(),
            clientOrderId: crypto.randomUUID(),
            userId: bot.clerkId,
            marketId: 0,
            type: "USER_SYNC",
            balance: INITIAL_BOT_BALANCE,
            timestamp: Date.now(),
        });
        console.log(`   ⚡ Synced ${bot.clerkId} to MatchEngine`);
    }

    console.log("✅ Zero-State Seeding Complete! Markets start at 0 resting orders (50-50 baseline).");
}

// CLI entrypoint if run directly
const isDirectRun = process.argv[1]?.includes("seed");
if (isDirectRun) {
    seedZeroState()
        .then(() => process.exit(0))
        .catch((err) => {
            console.error("❌ Seeding failed:", err);
            process.exit(1);
        });
}
