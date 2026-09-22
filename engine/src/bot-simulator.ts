import "dotenv/config";
import { RedisClient } from "@/lib/redis.js";
import crypto from "crypto";

const BOT_YES_USERS = ["bot_yes_alpha", "bot_yes_beta", "bot_mm_alpha"];
const BOT_NO_USERS = ["bot_no_alpha", "bot_no_beta", "bot_mm_beta"];

const activeIntervals = new Map<number, NodeJS.Timeout>();

export async function generateRandomBid(marketId: number) {
    const redisClient = await RedisClient.getInstance();

    // 1. Randomly pick YES or NO side
    const side = Math.random() > 0.5 ? "YES" : "NO";

    // 2. Pick a dedicated bot user for that side to avoid opposite-order conflicts
    const pool = side === "YES" ? BOT_YES_USERS : BOT_NO_USERS;
    const userId = pool[Math.floor(Math.random() * pool.length)];

    // 3. Generate realistic limit price in paise (1-100)
    // YES bids range 40-75 paise, NO bids range 25-60 paise
    let price: number;
    if (side === "YES") {
        price = Math.floor(Math.random() * 35) + 40; // 40 to 74
    } else {
        price = Math.floor(Math.random() * 35) + 25; // 25 to 59
    }

    // 4. Random quantity (5 to 50 shares)
    const quantity = Math.floor(Math.random() * 46) + 5;

    const clientOrderId = crypto.randomUUID();
    const requestId = crypto.randomUUID();

    // Enqueue command directly to Redis Stream
    await redisClient.enqueueCommand({
        requestId,
        clientOrderId,
        userId,
        marketId,
        type: "ORDER_CREATE",
        side,
        price,
        quantity,
        timestamp: Date.now(),
    });

    const formattedPrice = (price / 100).toFixed(2);
    console.log(`🤖 [BotSimulator]: Enqueued ${side} bid @ ₹${formattedPrice} (Qty: ${quantity}) for ${userId} on Market #${marketId}`);

    return {
        marketId,
        userId,
        clientOrderId,
        side,
        price,
        quantity,
    };
}

export async function stepSimulation(marketId: number, count = 5) {
    const results = [];
    for (let i = 0; i < count; i++) {
        const res = await generateRandomBid(marketId);
        results.push(res);
        if (i < count - 1) {
            await new Promise((r) => setTimeout(r, 200));
        }
    }
    return results;
}

export function startSimulationLoop(marketId: number, intervalMs = 2000) {
    if (activeIntervals.has(marketId)) {
        console.log(`⚠️ Simulation already running for Market #${marketId}`);
        return false;
    }

    console.log(`🚀 Starting automated bot simulation loop on Market #${marketId} (Interval: ${intervalMs}ms)...`);

    // Trigger initial batch immediately
    stepSimulation(marketId, 3).catch(console.error);

    const interval = setInterval(() => {
        generateRandomBid(marketId).catch((err) => {
            console.error(`❌ Bot simulation error on Market #${marketId}:`, err.message);
        });
    }, intervalMs);

    activeIntervals.set(marketId, interval);
    return true;
}

export function stopSimulationLoop(marketId: number) {
    const interval = activeIntervals.get(marketId);
    if (interval) {
        clearInterval(interval);
        activeIntervals.delete(marketId);
        console.log(`🛑 Stopped bot simulation loop on Market #${marketId}`);
        return true;
    }
    return false;
}

export function isSimulationActive(marketId: number): boolean {
    return activeIntervals.has(marketId);
}

// ─── CLI Entrypoint ───────────────────────────────────────────
async function main() {
    // If run directly from CLI (e.g., tsx src/bot-simulator.ts 1 1500)
    const args = process.argv.slice(2);
    const targetMarketId = parseInt(args[0] || "1", 10);
    const intervalMs = parseInt(args[1] || "2000", 10);

    console.log(`🤖 TradeOn Bot Simulator CLI`);
    console.log(`🎯 Target Market: #${targetMarketId}`);
    console.log(`⏱️ Interval: ${intervalMs}ms`);
    console.log(`Press Ctrl+C to stop simulation.\n`);

    startSimulationLoop(targetMarketId, intervalMs);
}

// Check if running as script directly
const isDirectRun = process.argv[1]?.includes("bot-simulator");
if (isDirectRun) {
    main().catch(console.error);
}
