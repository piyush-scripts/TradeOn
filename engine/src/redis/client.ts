import "dotenv/config";
import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const redis = new Redis(REDIS_URL, {
    maxRetriesPerRequest: null, // required for BullMQ / blocking commands
    enableReadyCheck: true,
    retryStrategy(times) {
        const delay = Math.min(times * 200, 5000);
        console.log(`⏳ Redis reconnecting in ${delay}ms (attempt ${times})...`);
        return delay;
    },
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error:", err.message));

export default redis;
