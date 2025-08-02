#!/usr/bin/env node

// Simple debug script to check product data
// Run with: node debug-products.js

const http = require("http");

function fetchProducts() {
  return new Promise((resolve, reject) => {
    const req = http.get(
      "http://localhost:3000/api/products?admin=true&limit=50",
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    req.on("error", (error) => {
      reject(error);
    });
  });
}

function fetchFeaturedProducts() {
  return new Promise((resolve, reject) => {
    const req = http.get(
      "http://localhost:3000/api/products?isFeatured=true",
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    req.on("error", (error) => {
      reject(error);
    });
  });
}

async function debugProducts() {
  try {
    console.log("🔍 Fetching products from API...\n");

    const result = await fetchProducts();
    const products = result.products || [];

    console.log(`📊 Total products: ${products.length}\n`);

    // Test featured products endpoint specifically
    console.log("🌟 Testing featured products endpoint...");
    const featuredResult = await fetchFeaturedProducts();
    const featuredProducts = featuredResult.products || [];
    console.log(`📊 Featured products from API: ${featuredProducts.length}\n`);

    // Group by category
    const byCategory = {};
    const featured = [];

    products.forEach((product) => {
      if (!byCategory[product.category]) {
        byCategory[product.category] = [];
      }
      byCategory[product.category].push(product);

      if (product.isFeatured) {
        featured.push(product);
      }
    });

    console.log("📁 Products by category:");
    Object.keys(byCategory).forEach((category) => {
      console.log(`  ${category}: ${byCategory[category].length} products`);
      byCategory[category].forEach((product) => {
        const status = [];
        if (product.isFeatured) status.push("FEATURED");
        if (!product.isActive) status.push("INACTIVE");
        if (product.stock <= 5) status.push("LOW_STOCK");

        console.log(`    - ${product.name} (${status.join(", ") || "NORMAL"})`);
      });
    });

    console.log(`\n⭐ Featured products: ${featured.length}`);
    featured.forEach((product) => {
      console.log(`  - ${product.name} (${product.category})`);
    });

    console.log("\n✅ Debug completed!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log(
      "\n💡 Make sure your Next.js server is running on localhost:3000"
    );
  }
}

debugProducts();
