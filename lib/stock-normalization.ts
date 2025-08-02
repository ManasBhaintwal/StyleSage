/**
 * Utility functions for handling stock data normalization
 * between legacy number format and new size-specific format
 */

/**
 * Normalizes stock data to the expected size-specific format
 * @param stock - Stock data (could be number or size-specific object)
 * @param sizes - Available sizes for the product
 * @returns Normalized stock object with size-specific quantities
 */
export function normalizeStock(
  stock: number | { [size: string]: number } | Map<string, number>,
  sizes: string[] = ["S", "M", "L", "XL"]
): { [size: string]: number } {
  // If stock is already an object with size keys, return it
  if (typeof stock === "object" && stock !== null && !(stock instanceof Map)) {
    return stock as { [size: string]: number };
  }

  // If stock is a Map (from Mongoose), convert to object
  if (stock instanceof Map) {
    const result: { [size: string]: number } = {};
    for (const [size, quantity] of stock.entries()) {
      result[size] = quantity;
    }
    return result;
  }

  // If stock is a number (legacy format), distribute evenly across sizes
  if (typeof stock === "number") {
    const result: { [size: string]: number } = {};
    const perSizeStock = Math.floor(stock / sizes.length);
    const remainder = stock % sizes.length;

    sizes.forEach((size, index) => {
      result[size] = perSizeStock + (index < remainder ? 1 : 0);
    });

    return result;
  }

  // Default to empty stock
  return {};
}

/**
 * Gets total stock across all sizes
 * @param stock - Stock data in any format
 * @param sizes - Available sizes
 * @returns Total stock quantity
 */
export function getTotalStock(
  stock: number | { [size: string]: number } | Map<string, number>,
  sizes: string[] = ["S", "M", "L", "XL"]
): number {
  if (typeof stock === "number") {
    return stock;
  }

  const normalizedStock = normalizeStock(stock, sizes);
  return Object.values(normalizedStock).reduce((sum, qty) => sum + qty, 0);
}

/**
 * Gets stock for a specific size
 * @param stock - Stock data in any format
 * @param size - Size to check
 * @param sizes - Available sizes
 * @returns Stock quantity for the specific size
 */
export function getStockForSize(
  stock: number | { [size: string]: number } | Map<string, number>,
  size: string,
  sizes: string[] = ["S", "M", "L", "XL"]
): number {
  const normalizedStock = normalizeStock(stock, sizes);
  return normalizedStock[size] || 0;
}
