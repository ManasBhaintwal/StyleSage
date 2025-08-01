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

async function initializeSampleProducts() {
  const sampleProducts = [
    {
      name: "Essential White Tee",
      slug: "essential-white-tee",
      description: "Classic white t-shirt made from premium organic cotton",
      price: 45,
      images: ["/placeholder.svg?height=400&width=400&text=White+Tee"],
      category: "collections",
      tags: ["essential", "basic", "cotton"],
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      colors: [],
      stock: 100,
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
      category: "anime",
      tags: ["naruto", "anime", "hokage"],
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      colors: [],
      stock: 75,
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
      category: "meme",
      tags: ["meme", "dog", "fine"],
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      colors: [],
      stock: 50,
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
      stock: 100,
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
