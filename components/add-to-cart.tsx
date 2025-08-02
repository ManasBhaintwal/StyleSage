"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStockCheck } from "@/hooks/use-stock-check";

interface AddToCartProps {
  productId: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  defaultColor?: string;
  defaultSize?: string;
  colors?: string[];
  sizes?: string[];
  stock?: { [size: string]: number };
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  compact?: boolean; // New prop for compact mode
}

export function AddToCart({
  productId,
  name,
  price,
  image,
  category = "",
  defaultColor = "Black",
  defaultSize = "M",
  colors = ["Black", "White", "Navy"],
  sizes = ["S", "M", "L", "XL"],
  stock = {},
  className,
  size = "sm",
  variant = "default",
  compact = false, // Default to false for backwards compatibility
}: AddToCartProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    colors.length > 0
      ? colors.includes(defaultColor)
        ? defaultColor
        : colors[0]
      : defaultColor || "Black" // Fallback to "Black" if no colors provided
  );
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [showSuccess, setShowSuccess] = useState(false);

  // Real-time stock check
  const {
    stock: currentStock,
    isLoading: stockLoading,
    error: stockError,
  } = useStockCheck(productId, selectedSize, true);

  // Sync selected size with defaultSize prop changes
  useEffect(() => {
    console.log(
      `AddToCart: Updating selectedSize from ${selectedSize} to ${defaultSize} for product ${productId}`
    );
    setSelectedSize(defaultSize);
  }, [defaultSize, selectedSize, productId]);

  const handleAddToCart = async () => {
    // Use real-time stock if available, fallback to passed stock prop
    const availableStock =
      currentStock !== undefined ? currentStock : stock[selectedSize] || 0;

    if (availableStock === 0) {
      toast({
        title: "Out of Stock",
        description: `${name} in size ${selectedSize} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }

    console.log(
      `AddToCart: Adding to cart - Product: ${name}, Size: ${selectedSize}, Color: ${selectedColor}, Available Stock: ${availableStock}`
    );

    setIsAdding(true);
    try {
      addToCart({
        productId,
        name,
        price,
        image,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
        category,
      });

      setShowSuccess(true);
      toast({
        title: "Added to cart",
        description: `${name}${
          selectedColor
            ? ` (${selectedColor}, ${selectedSize})`
            : ` (${selectedSize})`
        } has been added to your cart.`,
      });

      // Reset success state after 2 seconds
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  // Use real-time stock if available, fallback to passed stock prop
  const availableStock =
    currentStock !== undefined ? currentStock : stock[selectedSize] || 0;
  const isOutOfStock = availableStock === 0;
  const isLowStock = availableStock > 0 && availableStock <= 5;

  // If compact mode, only show the button
  if (compact) {
    return (
      <div className="space-y-1">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding || stockLoading}
          variant={variant}
          size={size}
          className={className}
        >
          {stockLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
          ) : isAdding ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
          ) : showSuccess ? (
            <Check className="w-4 h-4 mr-2" />
          ) : isOutOfStock ? (
            <AlertTriangle className="w-4 h-4 mr-2" />
          ) : (
            <ShoppingCart className="w-4 h-4 mr-2" />
          )}
          {stockLoading
            ? "Checking..."
            : isOutOfStock
            ? "Out of Stock"
            : isAdding
            ? "Adding..."
            : showSuccess
            ? "Added!"
            : "Add to Cart"}
        </Button>

        {/* Stock warning */}
        {!stockLoading && !stockError && (
          <>
            {isLowStock && !isOutOfStock && (
              <p className="text-orange-600 text-xs text-center">
                Only {availableStock} left!
              </p>
            )}
            {stockError && (
              <p className="text-red-600 text-xs text-center">
                Unable to check stock
              </p>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Color and Size selection for detailed product views */}
      {colors.length > 1 && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Color:</span>
          <div className="flex gap-1">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-2 py-1 text-xs border rounded ${
                  selectedColor === color
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes.length > 1 && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Size:</span>
          <div className="flex gap-1">
            {sizes.map((sizeOption) => {
              const sizeStock = stock[sizeOption] || 0;
              const isOutOfStock = sizeStock === 0;
              return (
                <button
                  key={sizeOption}
                  onClick={() => {
                    if (!isOutOfStock) {
                      setSelectedSize(sizeOption);
                    }
                  }}
                  disabled={isOutOfStock}
                  className={`px-3 py-2 text-sm rounded-md border flex-shrink-0 transition-colors ${
                    isOutOfStock
                      ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-60"
                      : selectedSize === sizeOption
                      ? "bg-gray-900 text-white border-transparent dark:bg-gray-700 dark:text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {sizeOption}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock || isAdding || stockLoading}
        variant={variant}
        size={size}
        className={className}
      >
        {stockLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
        ) : isAdding ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
        ) : showSuccess ? (
          <Check className="w-4 h-4 mr-2" />
        ) : isOutOfStock ? (
          <AlertTriangle className="w-4 h-4 mr-2" />
        ) : (
          <ShoppingCart className="w-4 h-4 mr-2" />
        )}
        {stockLoading
          ? "Checking..."
          : isOutOfStock
          ? "Out of Stock"
          : isAdding
          ? "Adding..."
          : showSuccess
          ? "Added!"
          : "Add to Cart"}
      </Button>

      {/* Stock information */}
      {!stockLoading && !stockError && (
        <>
          {isLowStock && !isOutOfStock && (
            <p className="text-orange-600 text-xs mt-1">
              Only {availableStock} left in stock!
            </p>
          )}
          {stockError && (
            <p className="text-red-600 text-xs mt-1">
              Unable to check current stock
            </p>
          )}
        </>
      )}
    </div>
  );
}
