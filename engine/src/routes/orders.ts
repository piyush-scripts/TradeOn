import { Router, type Request, type Response, type RequestHandler } from "express";
import crypto from "crypto";
import { z } from "zod";
import redis from "../redis/client.js";
import { requireClerkAuth, getClerkUserId } from "../middleware/auth.js";

const router = Router();

const orderPayloadSchema = z.object({
    marketId: z.number().int().positive(),
    side: z.enum(["YES", "NO"]),
    priceCents: z.number().int().min(1).max(9900), // Prices between 0.01 and 99.00
    quantity: z.number().int().positive(),
});

/**
 * POST /api/orders
 * Validates payload and pushes it to Redis `queue:orders`.
 * Does NOT execute the trade directly.
 */
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

        const { marketId, side, priceCents, quantity } = parseResult.data;

        // Generate UUID inside the gateway 
        const orderId = crypto.randomUUID();
        const orderMessage = {
            orderId,
            userId,
            marketId,
            side,
            priceCents,
            quantity,
            timestamp: Date.now(),
        };

        // Fast enqueue
        await redis.rpush("queue:orders", JSON.stringify(orderMessage));

        // Accepted
        res.status(202).json({
            message: "Order placed in queue",
            orderId,
        });
    } catch (err) {
        console.error("Failed to enqueue order:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

router.post("/", requireClerkAuth, createOrderRoute);

router.get("/orderbook/:marketId", async (req, res) => {
    try {
        const marketId = parseInt(req.params.marketId, 10);
        const cachedBook = await redis.get(`orderbook:${marketId}`);
        if (cachedBook) {
            res.json(JSON.parse(cachedBook));
            return;
        }
        res.json({ yesOrders: [], noOrders: [] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
