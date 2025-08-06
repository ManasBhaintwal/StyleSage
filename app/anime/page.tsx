"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Filter,
  Grid,
  List,
  ShoppingCart,
  Heart,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { CartBadge } from "@/components/cart-badge";
import { normalizeStock, getTotalStock } from "@/lib/stock-normalization";

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

export default function AnimePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [animeProducts, setAnimeProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const fetchAnimeProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/products?category=anime&isActive=true&_t=${Date.now()}`,
          {
            cache: "no-store",
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setAnimeProducts(data.products);
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
        console.error("Error fetching anime products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeProducts();

    // Refresh when page becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchAnimeProducts();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Create categories based on tags from products
  const categories = [
    { id: "all", name: "All Anime", count: animeProducts.length },
    {
      id: "naruto",
      name: "Naruto",
      count: animeProducts.filter((p) => p.tags.includes("naruto")).length,
    },
    {
      id: "attack-on-titan",
      name: "Attack on Titan",
      count: animeProducts.filter(
        (p) => p.tags.includes("attack-on-titan") || p.tags.includes("aot")
      ).length,
    },
    {
      id: "dragon-ball-z",
      name: "Dragon Ball Z",
      count: animeProducts.filter(
        (p) => p.tags.includes("dragon-ball-z") || p.tags.includes("dbz")
      ).length,
    },
    {
      id: "one-piece",
      name: "One Piece",
      count: animeProducts.filter((p) => p.tags.includes("one-piece")).length,
    },
    {
      id: "demon-slayer",
      name: "Demon Slayer",
      count: animeProducts.filter((p) => p.tags.includes("demon-slayer"))
        .length,
    },
    {
      id: "my-hero-academia",
      name: "My Hero Academia",
      count: animeProducts.filter((p) => p.tags.includes("my-hero-academia"))
        .length,
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? animeProducts
      : animeProducts.filter((product) =>
          product.tags.some(
            (tag) =>
              tag.includes(selectedCategory) ||
              (selectedCategory === "attack-on-titan" && tag === "aot") ||
              (selectedCategory === "dragon-ball-z" && tag === "dbz")
          )
        );

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading anime products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              TShirt Store
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/collections"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Collections
              </Link>
              <Link
                href="/anime"
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                Anime
              </Link>
              <Link
                href="/meme"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Memes
              </Link>
              <Link
                href="/custom"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Custom
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <CartBadge />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Anime Collection</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Express your otaku spirit with our premium anime-inspired designs.
            From classic series to the latest hits!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white">
              Premium Quality
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Official Designs
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Fast Shipping
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
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
                  className="whitespace-nowrap"
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
            <p className="text-gray-600 dark:text-gray-400">
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
                  className={`group hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:scale-105 ${
                    viewMode === "list" ? "flex-row min-h-48" : "min-h-96"
                  }`}
                >
                  <CardContent
                    className={`p-0 h-full ${
                      viewMode === "list" ? "flex" : "flex flex-col"
                    }`}
                  >
                    <div
                      className={`relative ${
                        viewMode === "list"
                          ? "w-48 flex-shrink-0"
                          : "aspect-square w-full"
                      }`}
                    >
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className={`object-cover transition-transform duration-300 ${
                          viewMode === "list" ? "rounded-l-lg" : "rounded-t-lg"
                        }`}
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
                        {getTotalStock(product.stock, product.sizes) <= 5 &&
                          getTotalStock(product.stock, product.sizes) > 0 && (
                            <p className="text-orange-600 text-xs mt-1 text-center">
                              Only {getTotalStock(product.stock, product.sizes)}{" "}
                              left in stock!
                            </p>
                          )}
                        {getTotalStock(product.stock, product.sizes) === 0 && (
                          <p className="text-red-600 text-xs mt-1 text-center">
                            Out of stock
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
