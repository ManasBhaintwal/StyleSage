"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    isNew?: boolean;
}

export function ProductCard({
    id,
    title,
    price,
    image,
    category,
    isNew,
}: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-card border border-border/50 rounded-lg overflow-hidden flex flex-col h-full"
        >
            {/* Image Area */}
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                {/* Badges */}
                {isNew && (
                    <span className="absolute top-2 left-2 z-10 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-glow-magenta">
                        New Drop
                    </span>
                )}

                {/* Placeholder Image (Replace with Next/Image later) */}
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-muted-foreground/20 font-bold text-4xl">
                    IMG
                </div>

                {/* Wishlist Action */}
                <button className="absolute top-2 right-2 p-2 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background hover:text-red-500">
                    <Heart className="h-4 w-4" />
                </button>

                {/* Quick Add Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                    <Button className="w-full" size="sm" variant="neon">
                        Add to Cart
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col gap-2">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">{category}</div>
                <Link href={`/products/${id}`} className="block">
                    <h3 className="font-heading font-medium text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                    </h3>
                </Link>
                <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-foreground">₹{price.toLocaleString()}</span>
                </div>
            </div>
        </motion.div>
    );
}
