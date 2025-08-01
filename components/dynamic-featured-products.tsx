"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProducts, type Product } from "@/lib/catalog";
import { AddToCart } from "@/components/add-to-cart";

export function DynamicFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      try {
        const allProducts = getProducts();
        // Get featured products or fallback to first 3 active products
        const featuredProducts = allProducts
          .filter(
            (product) =>
              product.isActive &&
              (product.isFeatured || allProducts.length <= 3)
          )
          .slice(0, 3);

        setProducts(featuredProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();

    // Listen for storage changes to update products in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "stylesage_products") {
        loadProducts();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group cursor-pointer border-0 shadow-none bg-white dark:bg-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300"
        >
          <CardContent className="p-0">
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden mb-4">
              {product.isFeatured && (
                <Badge className="absolute top-4 left-4 z-10 bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                  Featured
                </Badge>
              )}
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <Badge className="absolute top-4 right-4 z-10 bg-red-600 text-white">
                    Sale
                  </Badge>
                )}
              <Image
                src={
                  product.images[0] || "/placeholder.svg?height=400&width=400"
                }
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-2 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ₹{product.price}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </Badge>
                <AddToCart
                  productId={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0] || "/placeholder.svg"}
                  category={product.category}
                  colors={
                    product.category.toLowerCase() === "custom"
                      ? product.colors
                      : []
                  }
                  sizes={product.sizes}
                  stock={product.stock}
                  size="sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
