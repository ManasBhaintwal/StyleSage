"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Filter,
  Grid,
  List,
  Heart,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { normalizeStock, getTotalStock } from "@/lib/stock-normalization";
import { DynamicNavbar } from "@/components/dynamic-navbar";
import { Footer } from "@/components/home/Footer";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string[];
  tags: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

export default function CollectionsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [collectionsProducts, setCollectionsProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    fetchCollectionsProducts();
  }, []);

  const fetchCollectionsProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products?category=collections");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setCollectionsProducts(data.products || []);
      // Initialize default sizes - select first available size
      const defaultSizes: Record<string, string> = {};
      data.products.forEach((product: Product) => {
        const normalizedStock = normalizeStock(product.stock, product.sizes);
        // Find first size that's in stock
        const availableSize = product.sizes.find(
          (size) => (normalizedStock[size] || 0) > 0
        );
        defaultSizes[product._id] = availableSize || product.sizes[0] || "M";
      });
      setSelectedSizes(defaultSizes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const filteredProducts = collectionsProducts.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.tags.some((tag) =>
      tag.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  // Get unique categories from product tags for filtering
  const categories = [
    { id: "all", name: "All", count: collectionsProducts.length },
    ...Array.from(
      new Set(
        collectionsProducts.flatMap((product) =>
          product.tags.map((tag) => tag.toLowerCase())
        )
      )
    ).map((tag) => ({
      id: tag,
      name: tag.charAt(0).toUpperCase() + tag.slice(1),
      count: collectionsProducts.filter((p) =>
        p.tags.map((t) => t.toLowerCase()).includes(tag)
      ).length,
    })),
  ];

  const getProductBadge = (product: Product) => {
    if (product.isFeatured) return "Featured";
    if (product.tags.includes("bestseller")) return "Bestseller";
    if (product.tags.includes("new")) return "New";
    if (product.tags.includes("viral")) return "Viral";
    if (product.tags.includes("trending")) return "Trending";
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">
            Loading collections...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Error: {error}</p>
          <Button onClick={fetchCollectionsProducts}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <DynamicNavbar currentPath="/collections" />

      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="block font-mono text-primary text-sm uppercase tracking-[0.2em] mb-4 animate-pulse">Browse All</span>
          <h1 className="text-6xl md:text-8xl font-display font-black uppercase text-white tracking-tighter mb-4 leading-none">
            Collections
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Explore our inclusive collections of t-shirts, hand-picked for every style and occasion.
          </p>
        </div>

        {/* Decorative Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/5 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-primary/10 rounded-full blur-2xl animate-float-delayed" />
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap font-mono text-xs uppercase"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found for the selected category.
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredProducts.map((product) => {
              const badge = getProductBadge(product);
              return (
                <Card
                  key={product._id}
                  className={`group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full flex flex-col hover:scale-105 border-border bg-card ${viewMode === "list" ? "flex-row min-h-48" : "min-h-96"
                    }`}
                >
                  <CardContent
                    className={`p-0 h-full ${viewMode === "list" ? "flex" : "flex flex-col"
                      }`}
                  >
                    <div
                      className={`relative ${viewMode === "list"
                          ? "w-48 flex-shrink-0"
                          : "aspect-square w-full"
                        }`}
                    >
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className={`object-cover transition-transform duration-300 ${viewMode === "list" ? "rounded-l-lg" : "rounded-t-lg"
                          }`}
                      />
                      {badge && (
                        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground font-bold font-mono text-xs uppercase hover:bg-primary/90">
                          {badge}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/50 backdrop-blur-sm hover:bg-background text-primary"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      {product.originalPrice && (
                        <Badge className="absolute bottom-2 left-2 bg-secondary text-white font-mono text-xs">
                          Save ₹
                          {(product.originalPrice - product.price).toFixed(2)}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold font-display text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1 text-foreground uppercase tracking-wide">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-grow font-sans">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-sm font-medium ml-1 text-foreground font-mono">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground font-mono">
                          {product.reviews} reviews
                        </span>
                      </div>

                      {/* Price Section */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-foreground font-mono">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through font-mono">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Size Options */}
                      <div className="mb-3">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-sm font-medium text-muted-foreground flex-shrink-0">
                            Size:
                          </span>
                          <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                            {product.sizes.map((size) => {
                              const normalizedStock = normalizeStock(
                                product.stock,
                                product.sizes
                              );
                              const isOutOfStock =
                                (normalizedStock[size] || 0) === 0;
                              return (
                                <button
                                  key={size}
                                  onClick={() => {
                                    if (!isOutOfStock) {
                                      handleSizeChange(product._id, size);
                                    }
                                  }}
                                  disabled={isOutOfStock}
                                  className={`px-3 py-2 text-sm rounded-md border flex-shrink-0 transition-colors ${isOutOfStock
                                      ? "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-60"
                                      : selectedSizes[product._id] === size
                                        ? "bg-primary text-primary-foreground border-transparent"
                                        : "bg-card text-foreground border-border hover:bg-muted"
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
                            product.category.includes("custom")
                              ? product.colors
                              : ["Black"]
                          }
                          stock={normalizeStock(product.stock, product.sizes)}
                          category={product.category.join(", ")}
                          variant="default"
                          size="sm"
                          className="w-full"
                          compact={true}
                        />

                        {/* Stock Information */}
                        {(() => {
                          const totalStock = getTotalStock(
                            product.stock,
                            product.sizes
                          );
                          return (
                            <>
                              {totalStock <= 5 && totalStock > 0 && (
                                <p className="text-orange-600 text-xs mt-1 text-center">
                                  Only {totalStock} left in stock!
                                </p>
                              )}
                              {totalStock === 0 && (
                                <p className="text-destructive text-xs mt-1 text-center">
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
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
