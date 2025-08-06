import connectDB from "./mongodb";
import { initializeDefaultAdmin } from "./auth";
import Category from "./models/Category";
import Product from "./models/Product";

export async function initializeDatabase() {
  try {
    await connectDB();
    console.log("🔄 Initializing database...");

    // Initialize default admin
    await initializeDefaultAdmin();

    // Initialize default categories
    await initializeDefaultCategories();

    // Migrate existing products to new stock structure
    await migrateProductStock();

    // Initialize sample products
    await initializeSampleProducts();

    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
  }
}

async function initializeDefaultCategories() {
  const defaultCategories = [
    {
      name: "Collections",
      slug: "collections",
      description: "Our curated collections",
      isActive: true,
      order: 1,
    },
    {
      name: "Anime",
      slug: "anime",
      description: "Anime-inspired designs",
      isActive: true,
      order: 2,
    },
    {
      name: "Meme",
      slug: "meme",
      description: "Internet meme designs",
      isActive: true,
      order: 3,
    },
    {
      name: "Custom",
      slug: "custom",
      description: "Create your own design",
      isActive: true,
      order: 4,
    },
  ];

  for (const categoryData of defaultCategories) {
    const exists = await Category.findOne({ slug: categoryData.slug });
    if (!exists) {
      await Category.create(categoryData);
      console.log(`✅ Created category: ${categoryData.name}`);
    }
  }
}

async function migrateProductStock() {
  try {
    // Find all products that have old numeric stock structure
    const products = await Product.find({});

    for (const product of products) {
      // Check if stock is a number (old structure)
      if (typeof product.stock === "number") {
        console.log(`🔄 Migrating stock for product: ${product.name}`);

        // Create new stock structure based on sizes
        const newStock: { [size: string]: number } = {};
        const stockPerSize = Math.floor(product.stock / product.sizes.length);
        const remainder = product.stock % product.sizes.length;

        product.sizes.forEach((size: string, index: number) => {
          newStock[size] = stockPerSize + (index < remainder ? 1 : 0);
        });

        // Update the product with new stock structure
        await Product.updateOne(
          { _id: product._id },
          { $set: { stock: newStock } }
        );

        console.log(
          `✅ Migrated stock for ${product.name}: ${JSON.stringify(newStock)}`
        );
      }
    }

    console.log("✅ Stock migration completed");
  } catch (error) {
    console.error("❌ Stock migration failed:", error);
  }
}

async function initializeSampleProducts() {
  const sampleProducts = [
    {
      name: "Essential White Tee",
      slug: "essential-white-tee",
      description: "Classic white t-shirt made from premium organic cotton",
      price: 45,
      images: ["/placeholder.svg?height=400&width=400&text=White+Tee"],
      category: ["collections"],
      tags: ["essential", "basic", "cotton"],
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      colors: [],
      stock: {
        XS: 10,
        S: 15,
        M: 20,
        L: 20,
        XL: 15,
        "2XL": 10,
        "3XL": 5,
        "4XL": 3,
        "5XL": 2,
      },
      isActive: true,
      isFeatured: true,
      rating: 4.8,
      reviews: 156,
    },
    {
      name: "Naruto Hokage Dreams",
      slug: "naruto-hokage-dreams",
      description: "Iconic Naruto design featuring the path to becoming Hokage",
      price: 48,
      originalPrice: 55,
      images: ["/placeholder.svg?height=400&width=400&text=Naruto+Design"],
      category: ["anime"],
      tags: ["naruto", "anime", "hokage"],
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      colors: [],
      stock: {
        XS: 8,
        S: 12,
        M: 15,
        L: 15,
        XL: 12,
        "2XL": 8,
        "3XL": 3,
        "4XL": 2,
        "5XL": 0,
      },
      isActive: true,
      isFeatured: true,
      rating: 4.9,
      reviews: 234,
    },
    {
      name: "This is Fine Dog",
      slug: "this-is-fine-dog",
      description: "Perfect for when everything is definitely fine",
      price: 47,
      images: ["/placeholder.svg?height=400&width=400&text=This+Is+Fine"],
      category: ["meme"],
      tags: ["meme", "dog", "fine"],
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      colors: [],
      stock: {
        XS: 5,
        S: 8,
        M: 12,
        L: 12,
        XL: 8,
        "2XL": 3,
        "3XL": 2,
        "4XL": 0,
        "5XL": 0,
      },
      isActive: true,
      isFeatured: true,
      rating: 4.9,
      reviews: 623,
    },
    {
      name: "Custom Design T-Shirt",
      slug: "custom-design-basic",
      description:
        "Create your own unique design with our premium custom t-shirt service",
      price: 55,
      images: ["/placeholder.svg?height=400&width=400&text=Custom+Design"],
      category: "custom",
      tags: ["custom", "personalized", "design"],
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      colors: [
        "White",
        "Black",
        "Navy",
        "Red",
        "Green",
        "Blue",
        "Gray",
        "Pink",
      ],
      stock: {
        XS: 10,
        S: 15,
        M: 20,
        L: 20,
        XL: 15,
        "2XL": 10,
        "3XL": 5,
        "4XL": 3,
        "5XL": 2,
      },
      isActive: true,
      isFeatured: true,
      rating: 4.9,
      reviews: 89,
    },
  ];

  for (const productData of sampleProducts) {
    const exists = await Product.findOne({ slug: productData.slug });
    if (!exists) {
      await Product.create(productData);
      console.log(`✅ Created product: ${productData.name}`);
    }
  }
}
