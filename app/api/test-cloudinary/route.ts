import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Test Cloudinary configuration
export async function GET() {
  try {
    // This will test if Cloudinary is properly configured
    const result = await cloudinary.api.ping();

    return NextResponse.json({
      message: "Cloudinary configuration test successful",
      cloudName: cloudinary.config().cloud_name,
      status: result.status,
    });
  } catch (error) {
    console.error("Cloudinary configuration test failed:", error);
    return NextResponse.json(
      {
        error: "Cloudinary configuration test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
