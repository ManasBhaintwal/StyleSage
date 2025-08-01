import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Test environment endpoint",
    env: {
      NODE_ENV: process.env.NODE_ENV,
      // Add other environment variables you want to test
      MONGODB_URI: process.env.MONGODB_URI ? "Set" : "Not set",
      JWT_SECRET: process.env.JWT_SECRET ? "Set" : "Not set",
    },
  });
}
