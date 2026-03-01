"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock Filters
const FILTERS = [
    { id: "size", name: "Size", options: ["XS", "S", "M", "L", "XL", "2XL"] },
    { id: "fit", name: "Fit", options: ["Regular", "Oversized", "Boxy"] },
];

export function FilterBar() {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    return (
        <div className="sticky top-[80px] z-40 bg-background/80 backdrop-blur-md border-b border-white/5 py-4">
            <div className="container px-4 md:px-6 flex items-center justify-between">

                {/* Desktop Filter Row */}
                <div className="hidden md:flex items-center gap-4 overflow-x-auto scrollbar-none">
                    <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
                    {FILTERS.map((group) => (
                        <div key={group.id} className="flex items-center gap-2 border-r border-white/10 pr-4 last:border-0">
                            <span className="text-xs font-bold uppercase text-muted-foreground">{group.name}</span>
                            {group.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => toggleFilter(option)}
                                    className={cn(
                                        "text-sm px-3 py-1 rounded-full border transition-all duration-200",
                                        activeFilters.includes(option)
                                            ? "bg-primary/20 border-primary text-primary shadow-glow-cyan"
                                            : "bg-transparent border-white/10 hover:border-white/30 text-muted-foreground"
                                    )}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Mobile Filter Trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden gap-2">
                            <SlidersHorizontal className="h-4 w-4" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl border-t border-white/10 bg-background/95 backdrop-blur-xl">
                        <SheetHeader className="mb-6">
                            <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-6">
                            {FILTERS.map((group) => (
                                <div key={group.id} className="space-y-3">
                                    <h3 className="font-bold text-lg">{group.name}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {group.options.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => toggleFilter(option)}
                                                className={cn(
                                                    "text-sm px-4 py-2 rounded-full border transition-all duration-200",
                                                    activeFilters.includes(option)
                                                        ? "bg-primary/20 border-primary text-primary"
                                                        : "bg-secondary/10 border-transparent text-muted-foreground"
                                                )}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="mt-auto pt-8">
                                <Button className="w-full" size="lg" variant="neon">Apply Filters</Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Sort Dropdown (Both) */}
                <div className="flex items-center gap-2">
                    <span className="hidden md:inline text-sm text-muted-foreground">Sort:</span>
                    <Select defaultValue="newest">
                        <SelectTrigger className="w-[140px] h-9">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest Drops</SelectItem>
                            <SelectItem value="best-selling">Best Selling</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>

            {/* Active Filters Row (if any) */}
            <AnimatePresence>
                {activeFilters.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="container px-4 md:px-6 mt-3 overflow-hidden"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Active:</span>
                            {activeFilters.map(f => (
                                <motion.button
                                    key={f}
                                    layout
                                    onClick={() => toggleFilter(f)}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="flex items-center gap-1 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-sm font-bold"
                                >
                                    {f} <X className="h-3 w-3" />
                                </motion.button>
                            ))}
                            <button onClick={() => setActiveFilters([])} className="text-xs text-muted-foreground hover:text-white underline ml-2">
                                Clear all
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
