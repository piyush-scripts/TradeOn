import { createClient, RedisClientType } from "redis";

let client: RedisClientType | null = null;

// Ensure Redis client is reused across hot reloads in dev
async function getClient() {
  if (!client) {
    client = createClient({
      url: "redis://redis:6379", 
    });

    client.on("error", (err: Error) => {
      console.error("❌ Redis Client Error:", err);
    });

    await client.connect();
  }
  return client;
}


 const redis = await getClient();

 export default redis;

