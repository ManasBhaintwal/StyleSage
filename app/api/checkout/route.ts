import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { validateStock } from "@/lib/stock-utils";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const { userId, items, address, subtotal, shipping, total } =
      await request.json();

    await connectDB();

    // Validate stock availability before creating order
    const stockValidation = await validateStock(items);
    if (!stockValidation.valid) {
      const outOfStockDetails = stockValidation.outOfStockItems
        .map(
          (item) =>
            `Product ${item.productId} (Size: ${item.size}) - Requested: ${item.requestedQty}, Available: ${item.availableQty}`
        )
        .join(", ");

      return NextResponse.json(
        {
          success: false,
          error: "Insufficient stock",
          details:
            "Some items in your cart are out of stock or have insufficient quantity",
          outOfStockItems: stockValidation.outOfStockItems,
          message: `Out of stock: ${outOfStockDetails}`,
        },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: Math.round(total * 100), // Convert to smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Create order in database
    const order = new Order({
      userId,
      orderId,
      items,
      address,
      payment: {
        razorpayOrderId: razorpayOrder.id,
        amount: total,
        currency: "INR",
        status: "pending",
      },
      orderStatus: "placed",
      subtotal,
      shipping,
      total,
    });

    await order.save();

    return NextResponse.json({
      success: true,
      order: razorpayOrder,
      orderId,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
