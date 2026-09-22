import { Router, type RequestHandler } from "express";
import { z } from "zod";
import {
    generateRandomBid,
    stepSimulation,
    startSimulationLoop,
    stopSimulationLoop,
    isSimulationActive,
} from "../bot-simulator.js";

const router = Router();

const simulatePayloadSchema = z.object({
    marketId: z.number().int().positive(),
    action: z.enum(["start", "stop", "step"]),
    count: z.number().int().min(1).max(20).optional().default(5),
    intervalMs: z.number().int().min(500).max(10000).optional().default(2000),
});

const handleSimulateRoute: RequestHandler = async (req, res) => {
    try {
        const parseResult = simulatePayloadSchema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(400).json({ error: "Invalid simulation payload", details: parseResult.error.format() });
            return;
        }

        const { marketId, action, count, intervalMs } = parseResult.data;

        if (action === "start") {
            const started = startSimulationLoop(marketId, intervalMs);
            res.json({
                message: started ? `Bot simulation started for Market #${marketId}` : `Bot simulation already active for Market #${marketId}`,
                marketId,
                active: true,
            });
            return;
        }

        if (action === "stop") {
            const stopped = stopSimulationLoop(marketId);
            res.json({
                message: stopped ? `Bot simulation stopped for Market #${marketId}` : `Bot simulation was not active for Market #${marketId}`,
                marketId,
                active: false,
            });
            return;
        }

        if (action === "step") {
            const orders = await stepSimulation(marketId, count);
            res.json({
                message: `Generated ${orders.length} random bot bids for Market #${marketId}`,
                marketId,
                active: isSimulationActive(marketId),
                orders,
            });
            return;
        }
    } catch (err: any) {
        console.error("[botsRouter:handleSimulateRoute]:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

router.post("/simulate", handleSimulateRoute);

router.get("/status/:marketId", (req, res) => {
    const marketId = parseInt(req.params.marketId, 10);
    if (isNaN(marketId)) {
        res.status(400).json({ error: "Invalid marketId" });
        return;
    }
    res.json({
        marketId,
        active: isSimulationActive(marketId),
    });
});

export default router;
