import { Router } from "express";
import { requireClerkAuth, getClerkUserId } from "../middleware/auth.js";
import db from "../db/client.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/me", requireClerkAuth, async (req, res) => {
    try {
        const userId = getClerkUserId(req);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const user = await db.select({ balanceCents: users.balanceCents }).from(users).where(eq(users.clerkId, userId)).limit(1);
        const balance = user[0] ? user[0].balanceCents : 0;
        res.json({ balance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
