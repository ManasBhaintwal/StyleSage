import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
    title: string;
    tagline: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
}

export function ProductInfo({ title, tagline, price, originalPrice, rating, reviewCount }: ProductInfoProps) {
    return (
        <div className="space-y-4 border-b border-border pb-8 mb-8">
            {/* Header */}
            <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none mb-2 text-foreground">
                    {title}
                </h1>
                <p className="text-lg text-muted-foreground font-sans">
                    {tagline}
                </p>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-2">
                <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-4 h-4", i < Math.floor(rating) ? "fill-primary" : "text-muted-foreground")} />
                    ))}
                </div>
                <span className="text-sm text-muted-foreground underline decoration-dotted font-mono">
                    {reviewCount} Verified Reviews
                </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 pt-2">
                <span className="text-3xl font-bold text-foreground font-mono">
                    ₹{price.toLocaleString()}
                </span>
                {originalPrice && (
                    <span className="text-xl text-muted-foreground line-through decoration-destructive/50 font-mono">
                        ₹{originalPrice.toLocaleString()}
                    </span>
                )}
                {originalPrice && (
                    <span className="text-xs font-bold text-white bg-secondary px-2 py-1 rounded-sm uppercase transform -rotate-2 font-display">
                        Save {Math.round(((originalPrice - price) / originalPrice) * 100)}%
                    </span>
                )}
            </div>
        </div>
    );
}
