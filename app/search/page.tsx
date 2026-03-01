"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";
import { ProductGrid } from "@/components/listing/ProductGrid";
import { PageContainer } from "@/components/layout/PageContainer";
import { DynamicNavbar } from "@/components/dynamic-navbar";

const RECENT_SEARCHES = ["Naruto", "Pepe", "Oversized", "Hoodies"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setAllProducts(data.products || []);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allProducts.filter((product) => {
      const nameMatch = product.name?.toLowerCase().includes(q);
      const tagMatch = product.tags?.some((tag: string) =>
        tag.toLowerCase().includes(q),
      );
      const categoryMatch = product.category?.some((cat: string) =>
        cat.toLowerCase().includes(q),
      );
      return nameMatch || tagMatch || categoryMatch;
    });
    setResults(
      filtered.map((product) => ({
        id: product._id,
        title: product.name,
        price: product.price,
        category: Array.isArray(product.category)
          ? product.category.join(", ")
          : product.category,
        image: product.images?.[0] || "/prod1.jpg",
      })),
    );
  }, [query, allProducts]);

  return (
    <div className="min-h-screen bg-background">
      <DynamicNavbar />
      {/* Search Hero */}
      <div className="bg-surface border-b border-light py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-center">
              Find Your <span className="text-primary">Vibe</span>
            </h1>

            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for anime, memes, aesthetics..."
                className="h-16 pl-14 text-lg bg-background border-white/10 rounded-xl focus-visible:ring-primary"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Recent / Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">
                Trending:
              </span>
              {RECENT_SEARCHES.map((tag) => (
                <Button
                  key={tag}
                  variant="ghost"
                  size="sm"
                  className="rounded-full border border-white/5 hover:border-primary/50 hover:bg-primary/10"
                  onClick={() => setQuery(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PageContainer>
        {loading ? (
          <div className="text-center py-20 opacity-50">
            Loading products...
          </div>
        ) : query ? (
          <div className="space-y-8">
            <h2 className="text-xl font-bold">
              Results for &quot;{query}&quot;
            </h2>
            <ProductGrid products={results} />
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
            Start typing to search...
          </div>
        )}
      </PageContainer>
    </div>
  );
}
