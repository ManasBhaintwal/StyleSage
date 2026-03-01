import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { getUserFromToken, verifyJWT } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    let payload;
    try {
      payload = await verifyJWT(token);
    } catch {
      return NextResponse.json(
        { error: "Invalid authentication" },
        { status: 401 },
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    let orders;
    if (isAdmin) {
      // Only allow admin users to fetch all orders
      if (payload.role !== "admin") {
        return NextResponse.json(
          { error: "Admin access required" },
          { status: 403 },
        );
      }
      orders = await Order.find({}).sort({ createdAt: -1 }).exec();
    } else {
      // Regular users can only fetch their own orders using userId from token
      orders = await Order.find({ userId: payload.userId })
        .sort({ createdAt: -1 })
        .exec();
    }

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    let payload;
    try {
      payload = await verifyJWT(token);
    } catch {
      return NextResponse.json(
        { error: "Invalid authentication" },
        { status: 401 },
      );
    }

    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    const { orderId, orderStatus } = await request.json();

    await connectDB();

    const order = await Order.findOneAndUpdate(
      { orderId },
      { orderStatus },
      { new: true },
    );

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 },
    );
  }
}
