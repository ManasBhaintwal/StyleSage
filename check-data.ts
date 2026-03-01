
import connectDB from "./lib/mongodb";
import Product from "./lib/models/Product";

async function checkData() {
    console.log("Checking data...");
    try {
        await connectDB();
        const count = await Product.countDocuments();
        console.log(`✅ Product Count: ${count}`);

        if (count === 0) {
            console.log("⚠️ No products found. Checking init-db...");
        } else {
            const p = await Product.findOne();
            console.log("Sample Product:", p?.name);
        }
        process.exit(0);
    } catch (error) {
        console.error("❌ Data check FAILED:", error);
        process.exit(1);
    }
}

checkData();
