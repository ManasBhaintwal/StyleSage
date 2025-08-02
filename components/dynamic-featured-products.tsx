"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type Product } from "@/lib/catalog";

interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  sizes: string[];
  colors: string[];
  stock: { [size: string]: number };
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}
import { AddToCart } from "@/components/add-to-cart";

export function DynamicFeaturedProducts() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {}
  );

  const loadProducts = async () => {
    try {
      // Fetch featured products from the API with cache busting
      const response = await fetch(
        `/api/products?isFeatured=true&_t=${Date.now()}`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        // Initialize default sizes - select first available size
        const defaultSizes: Record<string, string> = {};
        data.products.forEach((product: ApiProduct) => {
          // Find first size that's in stock
          const availableSize = product.sizes.find(
            (size) => (product.stock[size] || 0) > 0
          );
          defaultSizes[product._id] = availableSize || product.sizes[0] || "M";
        });
        setSelectedSizes(defaultSizes);
      } else {
        console.error("Failed to fetch featured products");
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();

    // Refresh when page becomes visible again (handles browser caching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadProducts();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const getProductBadge = (product: ApiProduct) => {
    if (product.isFeatured) return "Featured";
    if (product.tags.includes("bestseller")) return "Bestseller";
    if (product.tags.includes("new")) return "New";
    if (product.tags.includes("viral")) return "Viral";
    if (product.tags.includes("trending")) return "Trending";
    return null;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse h-72">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-t-lg mb-2 flex-shrink-0" />
              <div className="p-2 space-y-1 flex-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mt-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          No featured products available
        </p>
        <Link href="/admin/catalog">
          <Button variant="outline">Add Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {products.map((product) => {
          const badge = getProductBadge(product);
          return (
            <CarouselItem
              key={product._id}
              className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col min-h-96 hover:scale-105">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={
                          product.images[0] ||
                          "/placeholder.svg?height=400&width=400"
                        }
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 rounded-t-lg"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      />
                      {badge && (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                          {badge}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      {product.originalPrice && (
                        <Badge className="absolute bottom-2 left-2 bg-green-500">
                          Save ₹{product.originalPrice - product.price}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 flex-grow">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {product.reviews} reviews
                        </span>
                      </div>

                      {/* Price Section */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Size Options */}
                      <div className="mb-3">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">
                            Size:
                          </span>
                          <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                            {product.sizes.map((size) => {
                              const isOutOfStock =
                                (product.stock[size] || 0) === 0;
                              return (
                                <button
                                  key={size}
                                  onClick={() => {
                                    if (!isOutOfStock) {
                                      setSelectedSizes((prev) => ({
                                        ...prev,
                                        [product._id]: size,
                                      }));
                                    }
                                  }}
                                  disabled={isOutOfStock}
                                  className={`px-3 py-2 text-sm rounded-md border flex-shrink-0 transition-colors ${
                                    isOutOfStock
                                      ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-60"
                                      : selectedSizes[product._id] === size
                                      ? "bg-gray-900 text-white border-transparent dark:bg-gray-700 dark:text-white"
                                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                                  }`}
                                >
                                  {size}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Add to Cart Section */}
                      <div className="mt-auto">
                        <AddToCart
                          key={`${product._id}-${selectedSizes[product._id]}`}
                          productId={product._id}
                          name={product.name}
                          price={product.price}
                          image={product.images[0] || "/placeholder.svg"}
                          sizes={product.sizes}
                          defaultSize={
                            selectedSizes[product._id] || product.sizes[0]
                          }
                          defaultColor="Black"
                          colors={
                            product.category.toLowerCase() === "custom"
                              ? product.colors
                              : ["Black"]
                          }
                          stock={product.stock}
                          category={product.category}
                          variant="default"
                          size="sm"
                          className="w-full"
                          compact={true}
                        />

                        {/* Stock Information */}
                        {(() => {
                          const totalStock = Object.values(
                            product.stock
                          ).reduce((sum, sizeStock) => sum + sizeStock, 0);
                          return (
                            <>
                              {totalStock <= 5 && totalStock > 0 && (
                                <p className="text-orange-600 text-xs mt-1 text-center">
                                  Only {totalStock} left in stock!
                                </p>
                              )}
                              {totalStock === 0 && (
                                <p className="text-red-600 text-xs mt-1 text-center">
                                  Out of stock
                                </p>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
