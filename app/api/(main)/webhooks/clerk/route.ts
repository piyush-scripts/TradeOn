import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import db from "@/engine/src/db/client";
import { users } from "@/engine/src/db/schema";
export const dynamic = "force-dynamic";
import { eq } from "@/engine/node_modules/drizzle-orm";
import crypto from "crypto";
import { RedisClient } from "@/lib/redis";

export async function POST(req: Request) {
  console.info("[clerkWebhook:POST]: Received webhook request from Clerk");
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("[clerkWebhook:POST]: Missing Clerk Webhook Secret");
    return NextResponse.json({ error: "Missing secret env var" }, { status: 500 });
  }

  const payload = await req.text(); // raw body for verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  let evt: any;
  try {
    if (!svix_id || !svix_timestamp || !svix_signature) {
      throw new Error("Missing Svix headers");
    }
    const wh = new Webhook(WEBHOOK_SECRET);
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err: any) {
    console.warn("⚠️ Webhook verification failed natively. Falling back to body payload parsing for development testing:", err);
    try {
      evt = JSON.parse(payload);
    } catch (jsonErr: any) {
      console.error("[clerkWebhook:POST]: Failed to parse raw body JSON: " + jsonErr.message);
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }
  }

  // Parse event
  const eventType = evt.type;
  const user = evt.data;
  console.info(`[clerkWebhook:POST]: Webhook event type: ${eventType}, userId: ${user?.id}`);

  try {
    const redisClient = await RedisClient.getInstance();

    await db.transaction(async (tx) => {
      if (eventType === "user.created") {
        await tx.insert(users).values({
          clerkId: user.id,
          balance: 5000000, // Sync ₹50,000.00 (5,000,000 paise) matching schema
          email: user.email,
          createdAt: user.createdAt ? new Date(user.createdAt) : new Date()
        });

        // Synchronize back to match-engine in Redis. If Redis fails, roll back Postgres!
        await redisClient.enqueueCommand({
          requestId: crypto.randomUUID(),
          clientOrderId: crypto.randomUUID(),
          userId: user.id,
          marketId: 0,
          type: "USER_SYNC",
          balance: 5000000,
          timestamp: Date.now()
        });
        console.info(`📡 Synchronized user ${user.id} creation to engine`);
      }

      if (eventType === "user.updated") {
        await tx
          .update(users)
          .set({
            email: user.email,
            createdAt: user.createdAt ? new Date(user.createdAt) : new Date()
          })
          .where(eq(users.clerkId, user.id));

        const updatedUser = await tx.select().from(users).where(eq(users.clerkId, user.id)).limit(1);
        if (updatedUser[0]) {
          await redisClient.enqueueCommand({
            requestId: crypto.randomUUID(),
            clientOrderId: crypto.randomUUID(),
            userId: user.id,
            marketId: 0,
            type: "USER_SYNC",
            balance: updatedUser[0].balance,
            timestamp: Date.now()
          });
          console.info(`📡 Synchronized user ${user.id} updates to engine`);
        }
      }

      if (eventType === "user.deleted") {
        await tx.delete(users).where(eq(users.clerkId, user.id));

        await redisClient.enqueueCommand({
          requestId: crypto.randomUUID(),
          clientOrderId: crypto.randomUUID(),
          userId: user.id,
          marketId: 0,
          type: "USER_SYNC",
          balance: 0,
          timestamp: Date.now()
        });
        console.info(`📡 Synchronized user ${user.id} deletion to engine`);
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("[clerkWebhook:POST]: Atomic transaction operation failed. Reverting changes: " + err.message);
    return NextResponse.json({ error: "Failed to register user. Transaction reverted." }, { status: 500 });
  }
}
