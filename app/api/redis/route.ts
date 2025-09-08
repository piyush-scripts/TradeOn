import { NextResponse } from "next/server";
import { createClient, RedisClientType } from "redis";

let client: RedisClientType | null = null;

// Ensure Redis client is reused across hot reloads in dev
async function getClient() {
  if (!client) {
    client = createClient({
      url: "redis://redis:6379", // change if using Docker Compose → "redis://redis:6379"
    });

    client.on("error", (err: Error) => {
      console.error("❌ Redis Client Error:", err);
    });

    await client.connect();
  }
  return client;
}

export async function GET() {
  try {
    const redis = await getClient();

    // Test SET / GET
    await redis.set("greeting", "Hello from Next.js + Redis!");
    const value = await redis.get("greeting");

    return NextResponse.json({ ok: true, value });
  } catch (err: any) {
    console.error("❌ Error in Redis API:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
