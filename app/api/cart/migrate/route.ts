import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Cart, { ICartItem } from "@/lib/models/Cart";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

// POST /api/cart/migrate - Migrate guest cart to user cart when user logs in
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { sessionId }: { sessionId: string } = body;

    // Get user from token
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "No authentication token" },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const userId = user._id.toString();

    // Find user's existing cart
    let userCart = await Cart.findOne({ userId });

    // Find session cart
    const sessionCart = await Cart.findOne({ sessionId });

    if (sessionCart && sessionCart.items.length > 0) {
      if (userCart) {
        // Merge carts - add session cart items to user cart, avoiding duplicates
        const existingProductIds = new Set(
          userCart.items.map(
            (item: ICartItem) => `${item.productId}-${item.color}-${item.size}`
          )
        );

        sessionCart.items.forEach((sessionItem: ICartItem) => {
          const itemKey = `${sessionItem.productId}-${sessionItem.color}-${sessionItem.size}`;
          const existingItem = userCart!.items.find(
            (item: ICartItem) =>
              `${item.productId}-${item.color}-${item.size}` === itemKey
          );

          if (existingItem) {
            // Update quantity
            existingItem.quantity += sessionItem.quantity;
          } else {
            // Add new item
            userCart!.items.push(sessionItem);
          }
        });

        await userCart.save();
      } else {
        // Convert session cart to user cart
        sessionCart.userId = userId;
        sessionCart.sessionId = null;
        await sessionCart.save();
        userCart = sessionCart;
      }

      // Delete the session cart
      await Cart.deleteOne({ sessionId });
    } else if (!userCart) {
      // Create empty user cart
      userCart = new Cart({ userId, items: [] });
      await userCart.save();
    }

    return NextResponse.json({
      success: true,
      items: userCart.items,
      totalItems: userCart.items.reduce(
        (sum: number, item: ICartItem) => sum + item.quantity,
        0
      ),
    });
  } catch (error) {
    console.error("Error migrating cart:", error);
    return NextResponse.json(
      { error: "Failed to migrate cart" },
      { status: 500 }
    );
  }
}
