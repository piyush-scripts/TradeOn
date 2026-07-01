import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { clerkAuth } from "./middleware/auth.js";
import ordersRouter from "./routes/orders.js";
import usersRouter from "./routes/users.js";
import subscriber from "./redis/subscriber.js";
import redis from "./redis/client.js";

const app = express();
const httpServer = http.createServer(app);
const PORT = parseInt(process.env.ENGINE_PORT || "4000", 10);

// ─── Socket.IO Setup ─────────────────────────────────────
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    // Subscribe to specific market
    socket.on("subscribe", async (marketId: number) => {
        socket.join(`market_${marketId}`);

        // Provide initial cached orderbook to client upon joining
        try {
            const cachedBook = await redis.get(`orderbook:${marketId}`);
            if (cachedBook) {
                socket.emit("orderbook_update", JSON.parse(cachedBook));
            } else {
                socket.emit("orderbook_update", { yesOrders: [], noOrders: [] });
            }
        } catch (e) {
            console.error("Failed to fetch starting orderbook for subscription", e);
        }
    });

    // Unsubscribe from a market
    socket.on("unsubscribe", (marketId: number) => {
        socket.leave(`market_${marketId}`);
    });
});

// ─── Redis PubSub Listener ───────────────────────────────
subscriber.subscribe("pubsub:market_updates", (err) => {
    if (err) {
        console.error("Failed to subscribe to market_updates:", err);
    } else {
        console.log("📡 Listening to Redis pubsub:market_updates");
    }
});

subscriber.on("message", (channel, message) => {
    if (channel === "pubsub:market_updates") {
        try {
            const payload = JSON.parse(message);
            if (payload.marketId) {
                io.to(`market_${payload.marketId}`).emit("orderbook_update", payload.book);
            }
        } catch (e) {
            console.error("Failed to parse pubsub message", e);
        }
    }
});

// ─── Global Middleware ───────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(clerkAuth);

// ─── Health Check ────────────────────────────────────────
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Routes ──────────────────────────────────────────────
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);

// ─── Start Server ────────────────────────────────────────
httpServer.listen(PORT, () => {
    console.log(`🚀 TradeOn Engine running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/health`);
});

export default app;
