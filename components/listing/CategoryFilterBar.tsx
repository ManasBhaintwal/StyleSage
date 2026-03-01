"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";

export function CategoryFilterBar() {
  const [priceRange, setPriceRange] = useState([0, 5000]);

  return (
    <div className="sticky top-16 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border py-4">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
        {/* Mobile Filter Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="border-border text-muted-foreground hover:text-foreground"
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-card border-r border-border w-[300px]"
          >
            <SheetHeader>
              <SheetTitle className="font-display uppercase text-2xl">
                Filters
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-8 py-8">
              {/* Categories */}
              <div className="space-y-4">
                <h4 className="font-bold uppercase tracking-wider text-sm">
                  Category
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Hoodies", "Tees", "Bottoms", "Accessories"].map((c) => (
                    <Badge
                      key={c}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-black transition-colors"
                    >
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-4">
                <h4 className="font-bold uppercase tracking-wider text-sm flex justify-between">
                  Price{" "}
                  <span>
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </span>
                </h4>
                <Slider
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <h4 className="font-bold uppercase tracking-wider text-sm">
                  Size
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {["S", "M", "L", "XL", "2XL"].map((s) => (
                    <button
                      key={s}
                      className="h-10 border border-border rounded flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-primary text-black font-bold uppercase">
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Quick Filter Pills (Desktop Horizontal Scroll) */}
        <div className="flex items-center gap-2 flex-1">
          <Badge
            variant="secondary"
            className="bg-white/10 text-white hover:bg-white/20 cursor-pointer px-4 py-1.5 h-9 rounded-full flex items-center gap-2"
          >
            New Arrivals <X className="w-3 h-3" />
          </Badge>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground hover:text-foreground cursor-pointer px-4 py-1.5 h-9 rounded-full"
          >
            On Sale
          </Badge>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground hover:text-foreground cursor-pointer px-4 py-1.5 h-9 rounded-full"
          >
            Trending
          </Badge>
        </div>

        {/* Sort Dropdown (Simple) */}
        <select className="h-9 bg-transparent border-none text-sm font-bold uppercase focus:ring-0 cursor-pointer text-muted-foreground hover:text-foreground">
          <option>Sort: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
    </div>
  );
}
