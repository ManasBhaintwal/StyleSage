import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

// GET /api/products - Get all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const isFeatured = searchParams.get("isFeatured");
    const isActive = searchParams.get("isActive");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    const admin = searchParams.get("admin"); // Add admin parameter

    // Build filter object
    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (isFeatured !== null) {
      filter.isFeatured = isFeatured === "true";
    }

    // For admin requests, include both active and inactive products
    if (admin === "true") {
      // Don't filter by isActive for admin requests
    } else if (isActive !== null) {
      filter.isActive = isActive === "true";
    } else {
      // Default to only active products unless explicitly requested
      filter.isActive = true;
    }

    // Build query
    let query = Product.find(filter).sort({ createdAt: -1 });

    // Apply pagination if specified
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    if (page && limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      query = query.skip(skip);
    }

    const products = await query.exec();

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    return NextResponse.json({
      products,
      total,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
