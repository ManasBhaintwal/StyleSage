"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface StickyCartBarProps {
    productName: string;
    price: number;
    isVisible: boolean;
    onAddToCart: () => void;
}

export function StickyCartBar({ productName, price, isVisible, onAddToCart }: StickyCartBarProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/90 backdrop-blur-xl border-t border-border md:hidden"
                >
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h4 className="font-display font-bold uppercase text-sm truncate max-w-[150px] text-foreground">{productName}</h4>
                            <span className="text-primary font-mono text-xs">₹{price.toLocaleString()}</span>
                        </div>
                        <Button onClick={onAddToCart} variant="neon" size="sm" className="px-6">
                            Add to Cart
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
