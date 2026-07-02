import { Router } from "express";
import { requireClerkAuth, getClerkUserId } from "../middleware/auth.js";
import db from "../db/client.js";
import { users, positions, markets, orders } from "../db/schema.js";
import { eq, and, inArray } from "drizzle-orm";
import { RedisClient } from "@/lib/redis.js";

const router = Router();

router.get("/me", requireClerkAuth, async (req, res) => {
    try {
        const userId = getClerkUserId(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const redisClient = await RedisClient.getInstance();
        const cached = await redisClient.getCachedUserBalance(userId);
        if (cached) {
            res.json({ balance: cached.available });
            return;
        }

        const user = await db.select({ balance: users.balance, reservedBalance: users.reservedBalance }).from(users).where(eq(users.clerkId, userId)).limit(1);
        const balance = user[0] ? user[0].balance : 0;
        const reserved = user[0] ? user[0].reservedBalance : 0;

        await redisClient.cacheUserBalance(userId, { available: balance, reserved });

        res.json({ balance });
    } catch (err: any) {
        console.error("[usersRouter:me]: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/me/portfolio", requireClerkAuth, async (req, res) => {
    try {
        const userId = getClerkUserId(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const userRow = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1);
        if (!userRow[0]) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const user = userRow[0];

        const redisClient = await RedisClient.getInstance();
        const cached = await redisClient.getCachedUserBalance(userId);
        const available = cached ? cached.available : user.balance;
        const reserved = cached ? cached.reserved : user.reservedBalance;

        // Fetch user positions joining with markets
        const userPositions = await db.select({
            marketId: positions.marketId,
            sharesYes: positions.sharesYes,
            sharesNo: positions.sharesNo,
            question: markets.question,
        })
        .from(positions)
        .innerJoin(markets, eq(positions.marketId, markets.id))
        .where(eq(positions.userId, user.id));

        res.json({
            balance: available,
            reservedBalance: reserved,
            positions: userPositions
        });
    } catch (err: any) {
        console.error("[usersRouter:getPortfolio]: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/me/orders", requireClerkAuth, async (req, res) => {
    try {
        const userId = getClerkUserId(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const userRow = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1);
        if (!userRow[0]) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const user = userRow[0];

        const openOrders = await db.select({
            id: orders.id,
            marketId: orders.marketId,
            side: orders.side,
            price: orders.price,
            quantity: orders.quantity,
            filledQty: orders.filledQty,
            status: orders.status,
            question: markets.question,
            createdAt: orders.createdAt
        })
        .from(orders)
        .innerJoin(markets, eq(orders.marketId, markets.id))
        .where(
            and(
                eq(orders.userId, user.id),
                inArray(orders.status, ["pending", "partially_filled"])
            )
        );

        res.json(openOrders);
    } catch (err: any) {
        console.error("[usersRouter:getOrders]: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
