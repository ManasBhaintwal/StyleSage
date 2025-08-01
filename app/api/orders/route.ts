import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Fetch user orders from database (mocked for now)
    const orders = [
      { id: 1, status: "Delivered", total: 500 },
      { id: 2, status: "Processing", total: 1200 },
    ];

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
