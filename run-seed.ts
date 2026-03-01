
import { initializeDatabase } from "./lib/init-db";

async function runSeed() {
    console.log("Running seed...");
    try {
        await initializeDatabase();
        console.log("✅ Seed COMPLETE!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seed FAILED:", error);
        process.exit(1);
    }
}

runSeed();
