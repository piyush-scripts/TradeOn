import "dotenv/config";
import Redis from "ioredis";

// Create a dedicated Redis subscriber client.
// IORedis instances that use `subscribe` modes block normal commands,
// so we must use a separate connection just for subscriptions.

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const subscriber = new Redis(REDIS_URL, {
    enableReadyCheck: true,
    retryStrategy(times) {
        const delay = Math.min(times * 200, 5000);
        console.log(`⏳ Redis subscriber reconnecting in ${delay}ms...`);
        return delay;
    },
});

subscriber.on("connect", () => console.log("✅ Redis Subscriber connected"));
subscriber.on("error", (err) => console.error("❌ Redis Subscriber error:", err.message));

export default subscriber;
