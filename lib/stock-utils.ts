import connectDB from "./mongodb";
import Product from "./models/Product";
import { IOrderItem } from "./models/Order";

/**
 * Helper function to safely get stock value from either Map or plain object
 * @param stock - Stock field from product (could be Map or plain object)
 * @param size - Size to check
 * @returns Stock quantity for the size
 */
function getStockValue(stock: any, size: string): number {
  if (!stock) return 0;

  // If it's a Map (from Mongoose), use .get()
  if (stock instanceof Map || (stock && typeof stock.get === "function")) {
    return stock.get(size) || 0;
  }

  // If it's a plain object (from JSON serialization), use bracket notation
  return stock[size] || 0;
}

/**
 * Validates if sufficient stock exists for order items
 * @param items - Array of order items to validate
 * @returns Promise<{ valid: boolean, outOfStockItems: { productId: string, size: string, requestedQty: number, availableQty: number }[] }>
 */
export async function validateStock(items: IOrderItem[]): Promise<{
  valid: boolean;
  outOfStockItems: {
    productId: string;
    size: string;
    requestedQty: number;
    availableQty: number;
  }[];
}> {
  await connectDB();

  const outOfStockItems: {
    productId: string;
    size: string;
    requestedQty: number;
    availableQty: number;
  }[] = [];

  for (const item of items) {
    try {
      const product = await Product.findById(item.productId);
      if (!product) {
        outOfStockItems.push({
          productId: item.productId,
          size: item.size,
          requestedQty: item.quantity,
          availableQty: 0,
        });
        continue;
      }

      const availableStock = getStockValue(product.stock, item.size);
      if (availableStock < item.quantity) {
        outOfStockItems.push({
          productId: item.productId,
          size: item.size,
          requestedQty: item.quantity,
          availableQty: availableStock,
        });
      }
    } catch (error) {
      outOfStockItems.push({
        productId: item.productId,
        size: item.size,
        requestedQty: item.quantity,
        availableQty: 0,
      });
    }
  }

  return {
    valid: outOfStockItems.length === 0,
    outOfStockItems,
  };
}

/**
 * Reduces stock quantities for order items using atomic updates.
 * Uses findOneAndUpdate with a stock >= quantity condition to prevent
 * race conditions and ensure stock never goes below 0.
 * @param items - Array of order items to reduce stock for
 * @returns Promise<{ success: boolean, errors: string[] }>
 */
export async function reduceStock(items: IOrderItem[]): Promise<{
  success: boolean;
  errors: string[];
}> {
  await connectDB();

  const errors: string[] = [];

  for (const item of items) {
    try {
      const result = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          [`stock.${item.size}`]: { $gte: item.quantity },
        },
        {
          $inc: {
            [`stock.${item.size}`]: -item.quantity,
          },
        },
        { new: true },
      );

      if (!result) {
        errors.push(
          `Insufficient stock or product not found for product ${item.productId}, size ${item.size}`,
        );
      }
    } catch (error) {
      errors.push(
        `Failed to update stock for product ${item.productId}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

/**
 * Restores stock quantities for order items (used for order cancellation)
 * @param items - Array of order items to restore stock for
 * @returns Promise<{ success: boolean, errors: string[] }>
 */
export async function restoreStock(items: IOrderItem[]): Promise<{
  success: boolean;
  errors: string[];
}> {
  await connectDB();

  const errors: string[] = [];
  const updates: Promise<any>[] = [];

  for (const item of items) {
    try {
      const updatePromise = Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: {
            [`stock.${item.size}`]: item.quantity,
          },
        },
        { new: true },
      ).then((updatedProduct) => {
        if (!updatedProduct) {
          errors.push(`Product ${item.productId} not found`);
        }
      });

      updates.push(updatePromise);
    } catch (error) {
      errors.push(
        `Failed to restore stock for product ${item.productId}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }

  try {
    await Promise.all(updates);
  } catch (error) {
    errors.push("Failed to execute stock restoration");
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

/**
 * Gets current stock for a specific product and size
 * @param productId - Product ID
 * @param size - Size to check
 * @returns Promise<number> - Current stock quantity
 */
export async function getCurrentStock(
  productId: string,
  size: string,
): Promise<number> {
  await connectDB();

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return 0;
    }

    return getStockValue(product.stock, size);
  } catch (error) {
    return 0;
  }
}
