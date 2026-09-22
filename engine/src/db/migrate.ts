import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "./client.js";
import path from "path";
import { seedZeroState } from "../seed.js";

async function main() {
    console.log("[db-migration]: Running database migrations...");
    const migrationsFolder = path.resolve(__dirname, "../../drizzle");
    await migrate(db, { migrationsFolder });
    console.log("[db-migration]: Migrations completed successfully.");

    // Run zero-state seeding for markets, bot users, and clean orderbooks
    console.log("[db-migration]: Executing zero-state seed initialization...");
    await seedZeroState();
    console.log("[db-migration]: Zero-state seed initialization finished.");

    process.exit(0);
}

main().catch((err) => {
    console.error("[db-migration]: Migration/Seeding failed:", err);
    process.exit(1);
});
