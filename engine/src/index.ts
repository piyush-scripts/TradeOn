import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { clerkAuth } from "./middleware/auth.js";
import ordersRouter from "./routes/orders.js";
import usersRouter from "./routes/users.js";
import { RedisClient } from "@/lib/redis.js";
import { createClient } from "redis";

const app = express();
const httpServer = http.createServer(app);
const PORT = parseInt(process.env.ENGINE_PORT || "4000", 10);

async function startServer() {
    const redisClient = await RedisClient.getInstance();

    const subscriber = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });
    subscriber.on("error", (err) => console.error("[RedisSubscriber:error]: " + err.message));
    await subscriber.connect();

    // ─── Socket.IO Setup ─────────────────────────────────────
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        socket.on("subscribe", async (marketId: number) => {
            socket.join(`market_${marketId}`);

            try {
                const cachedBook = await redisClient.getCachedOrderBook(marketId);
                if (cachedBook) {
                    socket.emit("orderbook_update", cachedBook);
                } else {
                    socket.emit("orderbook_update", { yesOrders: [], noOrders: [] });
                }
            } catch (e: any) {
                console.error("[SocketIOServer:subscribe]: Failed to fetch starting orderbook: " + e.message);
            }
        });

        socket.on("unsubscribe", (marketId: number) => {
            socket.leave(`market_${marketId}`);
        });
    });

    // ─── Redis PubSub Listener ───────────────────────────────
    try {
        await subscriber.subscribe("pubsub:market_updates", (message) => {
            try {
                const payload = JSON.parse(message);
                if (payload.marketId) {
                    io.to(`market_${payload.marketId}`).emit("orderbook_update", payload.book);
                }
            } catch (e: any) {
                console.error("[RedisSubscriber:message]: Failed to parse message: " + e.message);
            }
        });
        console.log("📡 Listening to Redis pubsub:market_updates");
    } catch (err: any) {
        console.error("[RedisSubscriber:subscribe]: Subscription failed: " + err.message);
    }

    // ─── Start Server ────────────────────────────────────────
    httpServer.listen(PORT, () => {
        console.log(`🚀 TradeOn Engine running on http://localhost:${PORT}`);
        console.log(`   Health: http://localhost:${PORT}/health`);
    });
}

// ─── Global Middleware ───────────────────────────────────
const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "http://localhost:3000",
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
            return;
        }
        const isAllowed = allowedOrigins.includes(origin) || 
                          origin.endsWith(".ngrok-free.app") || 
                          origin.startsWith("http://localhost:") || 
                          origin.startsWith("http://127.0.0.1:");
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(clerkAuth);

// ─── Health Check ────────────────────────────────────────
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Routes ──────────────────────────────────────────────
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);

// ─── Boot Server ─────────────────────────────────────────
startServer().catch((err) => {
    console.error("[index:startServer]: Boot failed: " + err.message);
    process.exit(1);
});

export default app;
