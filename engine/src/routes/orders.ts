import { Router, type Request, type Response, type RequestHandler } from "express";
import crypto from "crypto";
import { z } from "zod";
import { RedisClient } from "@/lib/redis.js";
import { requireClerkAuth, getClerkUserId } from "../middleware/auth.js";

const router = Router();

const orderPayloadSchema = z.object({
    marketId: z.number().int().positive(),
    side: z.enum(["YES", "NO"]),
    price: z.number().int()
        .min(1, { message: "Price must be at least 1 paise (₹0.01)" })
        .max(100, { message: "Price cannot exceed 100 paise (₹1.00)" }),
    quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
    clientOrderId: z.string().uuid().default(() => crypto.randomUUID()),
});

const createOrderRoute: RequestHandler = async (req, res) => {
    try {
        const userId = getClerkUserId(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const parseResult = orderPayloadSchema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(400).json({ error: "Invalid payload layout", details: parseResult.error.format() });
            return;
        }

        const { marketId, side, price, quantity, clientOrderId } = parseResult.data;

        // Retrieve idempotency key from header, fallback to random UUID if missing/invalid
        const headerKey = req.headers["idempotency-key"];
        const requestId = (typeof headerKey === "string" && z.string().uuid().safeParse(headerKey).success)
            ? headerKey
            : crypto.randomUUID();

        const redisClient = await RedisClient.getInstance();

        // Enforce backpressure throttling
        const queueLength = await redisClient.getCommandStreamLength();
        if (queueLength > 5000) {
            console.error(`[ordersRouter:createOrderRoute]: Throttling request due to stream backlog: ${queueLength}`);
            res.status(429).json({ error: "Server is busy. Please try again in a few seconds." });
            return;
        }

        const unique = await redisClient.acquireIdempotencyLock(requestId);
        if (!unique) {
            console.error(`[ordersRouter:createOrderRoute]: Duplicate request: ${requestId}`);
            res.status(409).json({ error: "Duplicate request" });
            return;
        }

        // Check if user has active resting orders on the opposite side
        const cachedBook = await redisClient.getCachedOrderBook(marketId);
        if (cachedBook) {
            const oppositeOrders = side === "YES" ? cachedBook.noOrders : cachedBook.yesOrders;
            const hasOppositeOrder = oppositeOrders.some(o => o.userId === userId);
            if (hasOppositeOrder) {
                res.status(400).json({
                    error: `You already have active bids on the ${side === "YES" ? "NO" : "YES"} side. You can only bid on one side at a time.`
                });
                return;
            }
        }

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

        res.status(202).json({
            message: "Order placed in queue",
            orderId: clientOrderId,
        });
    } catch (err: any) {
        console.error("[ordersRouter:createOrderRoute]: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

router.post("/", requireClerkAuth, createOrderRoute);

router.post("/cancel", requireClerkAuth, async (req, res) => {
    try {
        const userId = getClerkUserId(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const { marketId, orderId } = req.body;
        if (marketId === undefined || !orderId) {
            res.status(400).json({ error: "Missing marketId or orderId" });
            return;
        }

        const redisClient = await RedisClient.getInstance();
        const requestId = crypto.randomUUID();

        await redisClient.enqueueCommand({
            requestId,
            clientOrderId: String(orderId),
            userId,
            marketId: Number(marketId),
            type: "ORDER_CANCEL",
            timestamp: Date.now(),
        });

        res.json({ message: "Cancel request queued", orderId });
    } catch (err: any) {
        console.error("[ordersRouter:cancelOrder]: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/orderbook/:marketId", async (req, res) => {
    try {
        const marketId = parseInt(req.params.marketId, 10);
        const redisClient = await RedisClient.getInstance();
        const cachedBook = await redisClient.getCachedOrderBook(marketId);
        if (cachedBook) {
            res.json(cachedBook);
            return;
        }
        res.json({ yesOrders: [], noOrders: [] });
    } catch (err: any) {
        console.error("[ordersRouter:getOrderBook]: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
