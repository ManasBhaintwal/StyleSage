import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const isAdmin = searchParams.get("admin") === "true";

    await connectDB();

    let orders;
    if (isAdmin) {
      // Admin gets all orders
      orders = await Order.find({}).sort({ createdAt: -1 }).exec();
    } else if (userId) {
      // User gets their own orders
      orders = await Order.find({ userId }).sort({ createdAt: -1 }).exec();
    } else {
      return NextResponse.json(
        { success: false, error: "User ID required" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { orderId, orderStatus } = await request.json();

    await connectDB();

    const order = await Order.findOneAndUpdate(
      { orderId },
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
