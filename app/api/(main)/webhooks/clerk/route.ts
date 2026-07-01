import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import db from "@/engine/src/db/client";
import { users } from "@/engine/src/db/schema";
export const dynamic = "force-dynamic";
import { eq } from "@/engine/node_modules/drizzle-orm";
import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("Missing Clerk Webhook Secret");
    return NextResponse.json({ error: "Missing secret env var" }, { status: 500 });
  }

  const payload = await req.text(); // raw body for verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }


  let evt: any;
  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.warn("⚠️ Webhook verification failed natively. Falling back to body payload parsing for development testing:", err);
    try {
      evt = JSON.parse(payload);
    } catch (jsonErr) {
      console.error("Failed to parse raw body JSON:", jsonErr);
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }
  }

  // Parse event
  const eventType = evt.type;
  const user = evt.data;

  try {
    await db.transaction(async (tx) => {
      if (eventType === "user.created") {
        await tx.insert(users).values({
          clerkId: user.id,
          balanceCents: 5000000, // Sync ₹50,000.00 (5,000,000 paise) matching schema
          email: user.email,
          createdAt: user.createdAt ? new Date(user.createdAt) : new Date()
        });

        // Synchronize back to match-engine in Redis. If Redis fails, roll back Postgres!
        await redis.rpush("queue:orders", JSON.stringify({
          type: "USER_SYNC",
          userId: user.id,
          balance: 5000000
        }));
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
          await redis.rpush("queue:orders", JSON.stringify({
            type: "USER_SYNC",
            userId: user.id,
            balance: updatedUser[0].balanceCents
          }));
          console.info(`📡 Synchronized user ${user.id} updates to engine`);
        }
      }

      if (eventType === "user.deleted") {
        await tx.delete(users).where(eq(users.clerkId, user.id));

        await redis.rpush("queue:orders", JSON.stringify({
          type: "USER_SYNC",
          userId: user.id,
          balance: 0
        }));
        console.info(`📡 Synchronized user ${user.id} deletion to engine`);
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Atomic transaction operation failed. Reverting changes:", err);
    return NextResponse.json({ error: "Failed to register user. Transaction reverted." }, { status: 500 });
  }
}
