"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  stock?: number;
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
  stock = 10,
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

  // Sync selected size with defaultSize prop changes
  useEffect(() => {
    console.log(
      `AddToCart: Updating selectedSize from ${selectedSize} to ${defaultSize} for product ${productId}`
    );
    setSelectedSize(defaultSize);
  }, [defaultSize, selectedSize, productId]);

  const handleAddToCart = async () => {
    if (stock === 0) return;

    console.log(
      `AddToCart: Adding to cart - Product: ${name}, Size: ${selectedSize}, Color: ${selectedColor}`
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

  const isOutOfStock = stock === 0;

  // If compact mode, only show the button
  if (compact) {
    return (
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock || isAdding}
        variant={variant}
        size={size}
        className={className}
      >
        {isAdding ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
        ) : showSuccess ? (
          <Check className="w-4 h-4 mr-2" />
        ) : (
          <ShoppingCart className="w-4 h-4 mr-2" />
        )}
        {isOutOfStock
          ? "Out of Stock"
          : isAdding
          ? "Adding..."
          : showSuccess
          ? "Added!"
          : "Add to Cart"}
      </Button>
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
            {sizes.map((sizeOption) => (
              <button
                key={sizeOption}
                onClick={() => setSelectedSize(sizeOption)}
                className={`px-2 py-1 text-xs border rounded ${
                  selectedSize === sizeOption
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                }`}
              >
                {sizeOption}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock || isAdding}
        variant={variant}
        size={size}
        className={className}
      >
        {isAdding ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
        ) : showSuccess ? (
          <Check className="w-4 h-4 mr-2" />
        ) : (
          <ShoppingCart className="w-4 h-4 mr-2" />
        )}
        {isOutOfStock
          ? "Out of Stock"
          : isAdding
          ? "Adding..."
          : showSuccess
          ? "Added!"
          : "Add to Cart"}
      </Button>
    </div>
  );
}
