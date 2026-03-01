import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { getUserFromToken } from "@/lib/auth";
import { restoreStock } from "@/lib/stock-utils";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }
    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid authentication" },
        { status: 401 },
      );
    }

    const { orderId, reason } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 },
      );
    }

    await connectDB();

    // Find the order
    const order = await Order.findOne({ orderId });
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 },
      );
    }

    // Verify the order belongs to the authenticated user (or user is admin)
    if (order.userId !== user._id.toString() && user.role !== "admin") {
      return NextResponse.json(
        { error: "You are not authorized to cancel this order" },
        { status: 403 },
      );
    }

    // Check if order can be cancelled
    if (order.orderStatus === "cancelled") {
      return NextResponse.json(
        { success: false, error: "Order is already cancelled" },
        { status: 400 },
      );
    }

    if (order.orderStatus === "shipped" || order.orderStatus === "delivered") {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot cancel order that has been shipped or delivered",
        },
        { status: 400 },
      );
    }

    // Only restore stock if payment was completed and order was confirmed
    let stockRestored = false;
    let stockErrors: string[] = [];

    if (
      order.payment.status === "completed" &&
      order.orderStatus === "confirmed"
    ) {
      const stockRestoration = await restoreStock(order.items);
      stockRestored = stockRestoration.success;
      stockErrors = stockRestoration.errors;

      if (!stockRestoration.success) {
        console.error("Stock restoration errors:", stockRestoration.errors);
      }
    }

    // Initiate Razorpay refund if payment was completed
    let refundStatus: "refunded" | "refund_failed" | null = null;
    let refundId: string | null = null;

    if (
      order.payment.status === "completed" &&
      order.payment.razorpayPaymentId
    ) {
      try {
        const paymentId = order.payment.razorpayPaymentId;
        const refundResponse = await fetch(
          `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${Buffer.from(
                `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`,
              ).toString("base64")}`,
            },
            body: JSON.stringify({
              amount: order.payment.amount * 100, // Convert to paise
            }),
          },
        );

        const refundData = await refundResponse.json();

        if (refundResponse.ok && refundData.id) {
          refundStatus = "refunded";
          refundId = refundData.id;
        } else {
          console.error("Razorpay refund failed:", refundData);
          refundStatus = "refund_failed";
        }
      } catch (refundError) {
        console.error("Razorpay refund error:", refundError);
        refundStatus = "refund_failed";
      }
    }

    // Update order status to cancelled
    const updateData: Record<string, unknown> = {
      orderStatus: "cancelled",
      cancelReason: reason || "Customer requested cancellation",
      cancelledAt: new Date(),
    };

    if (refundStatus === "refunded") {
      updateData["payment.status"] = "refunded";
      updateData["payment.razorpayRefundId"] = refundId;
    } else if (refundStatus === "refund_failed") {
      updateData["payment.status"] = "refund_failed";
    }

    await Order.findOneAndUpdate({ orderId }, updateData);

    return NextResponse.json({
      success: true,
      message:
        refundStatus === "refund_failed"
          ? "Order cancelled but refund failed. Please contact support."
          : "Order cancelled successfully",
      stockRestored,
      stockErrors,
      refundStatus,
    });
  } catch (error) {
    console.error("Order cancellation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to cancel order" },
      { status: 500 },
    );
  }
}
