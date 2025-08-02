import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { reduceStock } from "@/lib/stock-utils";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = await request.json();

    await connectDB();

    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Get the order to access items for stock reduction
      const order = await Order.findOne({ orderId });
      if (!order) {
        return NextResponse.json(
          { success: false, error: "Order not found" },
          { status: 404 }
        );
      }

      // Reduce stock quantities for all items in the order
      const stockReduction = await reduceStock(order.items);
      if (!stockReduction.success) {
        console.error("Stock reduction errors:", stockReduction.errors);
        // Still proceed with order confirmation but log the errors
        // In a production environment, you might want to handle this differently
      }

      // Update order with payment details
      await Order.findOneAndUpdate(
        { orderId },
        {
          "payment.razorpayPaymentId": razorpay_payment_id,
          "payment.razorpaySignature": razorpay_signature,
          "payment.status": "completed",
          orderStatus: "confirmed",
        }
      );

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        stockReduced: stockReduction.success,
        stockErrors: stockReduction.errors,
      });
    } else {
      // Update order as failed
      await Order.findOneAndUpdate(
        { orderId },
        {
          "payment.status": "failed",
        }
      );

      return NextResponse.json(
        { success: false, error: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
