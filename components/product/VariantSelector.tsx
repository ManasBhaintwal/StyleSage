"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface VariantSelectorProps {
    sizes: { id: string; label: string; available: boolean }[];
    colors: { id: string; label: string; hex: string }[];
    selectedSize: string;
    selectedColor: string;
    onSizeSelect: (id: string) => void;
    onColorSelect: (id: string) => void;
}

export function VariantSelector({
    sizes,
    colors,
    selectedSize,
    selectedColor,
    onSizeSelect,
    onColorSelect
}: VariantSelectorProps) {

    return (
        <div className="space-y-6">
            {/* Colors */}
            <div className="space-y-3">
                <span className="text-sm font-bold uppercase text-muted-foreground tracking-wider font-display">Select Color</span>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => onColorSelect(color.id)}
                            className={cn(
                                "group relative w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                selectedColor === color.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "hover:scale-110"
                            )}
                        >
                            <span
                                className="w-full h-full rounded-full border border-border shadow-inner"
                                style={{ backgroundColor: color.hex }}
                            />
                            {selectedColor === color.id && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-white/90 drop-shadow-md" />
                                </motion.div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold uppercase text-muted-foreground tracking-wider font-display">Select Size</span>
                    <button className="text-xs text-primary hover:underline font-mono">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size.id}
                            disabled={!size.available}
                            onClick={() => onSizeSelect(size.id)}
                            className={cn(
                                "relative min-w-[3.5rem] h-12 rounded-lg border flex items-center justify-center font-bold text-sm transition-all duration-200 font-mono",
                                !size.available && "opacity-40 cursor-not-allowed decoration-slash text-muted-foreground border-border bg-muted",
                                size.available && selectedSize === size.id
                                    ? "border-primary bg-primary/10 text-primary shadow-glow-primary"
                                    : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {size.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
