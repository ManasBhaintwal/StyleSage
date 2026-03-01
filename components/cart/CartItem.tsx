"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CartItemProps {
    id: string;
    title: string;
    variant: string; // "Size: M / Color: Black"
    price: number;
    quantity: number;
    image: string;
}

export function CartItem({ title, variant, price, quantity, image }: CartItemProps) {
    return (
        <div className="flex gap-4 py-6 border-b border-white/5 last:border-0 group">
            {/* Thumbnail */}
            <div className="relative aspect-[3/4] w-20 md:w-24 bg-surface rounded-lg overflow-hidden border border-white/5 shrink-0">
                <div className="absolute inset-0 bg-muted-foreground/10" />
                {/* Placeholder img logic */}
                <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground font-mono">IMG</div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-heading font-bold uppercase text-lg leading-tight">{title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{variant}</p>
                    </div>
                    <span className="font-mono font-bold">₹{price.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                    {/* Stepper */}
                    <div className="flex items-center gap-3 bg-surface border border-white/5 rounded-full px-2 py-1">
                        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    <button className="text-muted-foreground hover:text-red-500 transition-colors p-2">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
