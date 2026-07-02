import { RedisClient } from "@/lib/redis.js";
import crypto from "crypto";

async function main() {
    const redisClient = await RedisClient.getInstance();
    await redisClient.enqueueCommand({
        requestId: crypto.randomUUID(),
        clientOrderId: crypto.randomUUID(),
        userId: "user_3FxB6H6f4bpr7BRRTIW0Wkz9WJm", // Secondary User
        marketId: 1,
        type: "ORDER_CREATE",
        side: "NO",
        price: 40,
        quantity: 10,
        timestamp: Date.now()
    });
    console.log("⚡ Placed matching NO order at 40 (Qty: 10) for secondary user!");
    process.exit(0);
}

main().catch(console.error);
