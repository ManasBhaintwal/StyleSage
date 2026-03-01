"use client";

import { useState, useRef } from "react";
import { ThreeDProductGallery } from "@/components/product/ThreeDProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { VariantSelector } from "@/components/product/VariantSelector";
import { StickyCartBar } from "@/components/product/StickyCartBar";
import { ProductGrid } from "@/components/listing/ProductGrid";
import { ProductDetailsAccordion } from "@/components/product/ProductDetailsAccordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Heart, Ruler, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInView, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Types (same as before)
interface ProductSize {
    id: string;
    label: string;
    available: boolean;
}

interface ProductColor {
    id: string;
    label: string;
    hex: string;
}

interface ProductData {
    id: string;
    title: string;
    tagline: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    description: string;
    images: string[];
    sizes: ProductSize[];
    colors: ProductColor[];
}

interface RelatedProduct {
    id: string;
    title: string;
    price: number;
    category: string;
    image: string;
    isNew?: boolean;
}

interface ProductClientPageProps {
    product: ProductData;
    relatedProducts: RelatedProduct[];
}

export function ProductClientPage({ product, relatedProducts }: ProductClientPageProps) {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id);
    const [isAdding, setIsAdding] = useState(false);
    const { toast } = useToast();

    const mainButtonRef = useRef(null);
    const isMainButtonInView = useInView(mainButtonRef);

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast({
                variant: "destructive",
                title: "Select a Size",
                description: "You gotta fit in it to rock it.",
            });
            return;
        }
        setIsAdding(true);
        // Simulate API call
        setTimeout(() => {
            setIsAdding(false);
            toast({
                title: "Added to Cart!",
                description: "Secure the drip.",
                action: <CheckCircle2 className="w-5 h-5 text-primary" />,
            });
        }, 800);
    };

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Sticky Progress Bar (Optional, can add later) */}

            <div className="container px-4 md:px-6 py-8 md:py-16">

                {/* Breadcrumbs Placeholder */}
                <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground font-mono uppercase tracking-wider">
                    <span>Home</span> / <span>Shop</span> / <span className="text-primary">{product.title}</span>
                </div>

                {/* Main 2-Column Layout */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">

                    {/* Left: 3D Gallery (Sticky) */}
                    <div className="lg:col-span-7">
                        <ThreeDProductGallery images={product.images} />
                    </div>

                    {/* Right: Info Panel */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {/* Header Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex gap-2 mb-4">
                                <Badge className="bg-primary text-black font-bold uppercase tracking-wide">Bestseller</Badge>
                                <Badge variant="outline" className="text-secondary border-secondary font-mono uppercase tracking-wide">Fast Selling</Badge>
                            </div>
                            <ProductInfo
                                title={product.title}
                                tagline={product.tagline}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                rating={product.rating}
                                reviewCount={product.reviewCount}
                            />
                        </motion.div>

                        {/* Selectors */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <VariantSelector
                                sizes={product.sizes}
                                colors={product.colors}
                                selectedSize={selectedSize}
                                selectedColor={selectedColor}
                                onSizeSelect={setSelectedSize}
                                onColorSelect={setSelectedColor}
                            />

                            {/* Size Guide Trigger */}
                            <div className="mt-4 flex justify-end">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="link" className="text-muted-foreground hover:text-white p-0 h-auto font-mono text-xs uppercase flex items-center gap-2">
                                            <Ruler className="w-4 h-4" /> Size Guide
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="bg-card border-l border-border">
                                        <SheetHeader>
                                            <SheetTitle className="font-display uppercase text-2xl">Size Guide</SheetTitle>
                                        </SheetHeader>
                                        <div className="py-8">
                                            <p className="text-muted-foreground">Standard oversized fit. If you prefer a regular fit, size down.</p>
                                            {/* Vector diagram placeholder */}
                                            <div className="w-full h-64 bg-muted rounded-lg mt-4 flex items-center justify-center border border-dashed border-border/50">
                                                <span className="text-muted-foreground font-mono text-xs">Measurement Diagram Here</span>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col gap-4 border-t border-border pt-8"
                        >
                            <div className="flex gap-4" ref={mainButtonRef}>
                                <Button
                                    size="lg"
                                    className="flex-1 h-14 text-lg bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-widest relative overflow-hidden group"
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {isAdding ? "Adding..." : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
                                    </span>
                                    {/* Particle effect placeholder - in real impl, complex Canvas/Div anim */}
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </Button>

                                <Button size="lg" variant="outline" className="h-14 px-4 border-border hover:border-accent hover:text-accent group">
                                    <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </Button>
                            </div>

                            <p className="text-center text-xs text-muted-foreground font-mono">
                                Free shipping on orders over ₹1500 • 7-day easy returns
                            </p>
                        </motion.div>

                        {/* Accordions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <ProductDetailsAccordion />
                        </motion.div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-32 border-t border-border pt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-display font-black uppercase text-3xl md:text-5xl">Complete The Look</h2>
                        <Button variant="outline" className="hidden md:flex">View Collection</Button>
                    </div>
                    {/* @ts-ignore - Mock data compat */}
                    <ProductGrid products={relatedProducts as any} />
                </div>
            </div>

            <StickyCartBar
                productName={product.title}
                price={product.price}
                isVisible={!isMainButtonInView}
                onAddToCart={handleAddToCart}
            />
        </div>
    );
}
