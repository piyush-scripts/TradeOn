import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import  db  from "@/db/client"; 
import { users } from "@/db/schema";
export const dynamic = "force-dynamic";
import { eq } from "drizzle-orm";


export async function POST(req: Request) {
  // Clerk signs all webhooks using Svix — we verify here.
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("Missing Clerk Webhook Secret");
    return NextResponse.json({ error: "Missing secret" }, { status: 500 });
  }

  const payload = await req.text(); // raw body for verification
  const headerPayload =  await headers();
  const svix_id =  headerPayload.get("svix-id");
  const svix_timestamp =  headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Parse event
  const eventType = evt.type;
  const user = evt.data;

  try {
    if (eventType === "user.created") {
      await db.insert(users).values({
        userid : user.id,
        balance : 50000,
        email : user.email,
        createdAt : user.createdAt
      });
    }

    if (eventType === "user.updated") {
      await db
        .update(users)
        .set({
        userid : user.id,
        email : user.email,
        createdAt : user.createdAt
        })
        .where(eq(users.id, user.id));
    }

    if (eventType === "user.deleted") {
      await db.delete(users).where(eq(users.id, user.id));
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Database operation failed:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
