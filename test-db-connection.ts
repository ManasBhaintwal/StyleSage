
import connectDB from "./lib/mongodb";

async function testConnection() {
    console.log("Testing MongoDB connection...");
    try {
        const conn = await connectDB();
        console.log("✅ Connection SUCCESS!");
        console.log("Database Name:", conn.connection.name);
        console.log("Host:", conn.connection.host);
        process.exit(0);
    } catch (error) {
        console.error("❌ Connection FAILED:", error);
        process.exit(1);
    }
}

testConnection();
