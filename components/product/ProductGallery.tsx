"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Stage */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-card border border-border group perspective-[1000px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 preserve-3d"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* 3D Tilt Wrapper */}
                        <motion.div
                            className="w-full h-full relative"
                            whileHover={{ rotateY: 5, rotateX: -5, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {/* Placeholder Image Logic */}
                            <div className={cn("w-full h-full bg-gradient-to-br from-card to-background flex items-center justify-center")}>
                                <span className="text-muted-foreground/20 font-display text-9xl font-bold opacity-50 select-none">
                                    IMG {selectedIndex + 1}
                                </span>
                                {/* In real app, next/image goes here */}
                                <div className="absolute top-4 left-4 inline-flex px-3 py-1 bg-black/50 backdrop-blur rounded-full text-xs font-bold border border-white/10 text-white">
                                    High Quality Preview
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnails (Desktop) / Dots (Mobile) */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x px-1">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedIndex(i)}
                        className={cn(
                            "relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                            "snap-center",
                            selectedIndex === i
                                ? "border-primary shadow-glow-primary"
                                : "border-transparent opacity-50 hover:opacity-100"
                        )}
                    >
                        <div className="w-full h-full bg-card flex items-center justify-center text-xs text-muted-foreground font-mono">
                            {i + 1}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
