import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "./client.js";
import { markets } from "./schema.js";
import path from "path";

async function main() {
    console.log("[db-migration]: Running database migrations...");
    const migrationsFolder = path.resolve(__dirname, "../../drizzle");
    await migrate(db, { migrationsFolder });
    console.log("[db-migration]: Migrations completed successfully.");

    // Check and seed initial markets to prevent foreign key errors during trades
    console.log("[db-migration]: Checking for initial markets...");
    const existingMarkets = await db.select().from(markets).limit(1);
    if (existingMarkets.length === 0) {
        console.log("[db-migration]: Seeding initial markets...");
        await db.insert(markets).values([
            { question: "Will Bitcoin reach $100k by December 2026?", status: "open" },
            { question: "Will AI pass the Turing test in 2026?", status: "open" },
            { question: "Will the Fed cut interest rates in Q4?", status: "open" },
            { question: "Will GTA 6 release on schedule?", status: "open" }
        ]);
        console.log("[db-migration]: Initial markets seeded successfully.");
    } else {
        console.log("[db-migration]: Markets already seeded.");
    }

    process.exit(0);
}

main().catch((err) => {
    console.error("[db-migration]: Migration/Seeding failed:", err);
    process.exit(1);
});
