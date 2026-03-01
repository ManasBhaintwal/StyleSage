"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    isNew?: boolean;
}

interface TagPageProps {
    tag: string;
    title: string;
    description: string;
    topPicks: Product[];
    allProducts: Product[];
}

export function DynamicTagPage({ tag, title, description, topPicks, allProducts }: TagPageProps) {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Editorial Header */}
            <div className="relative w-full py-24 px-4 overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-0" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay z-10" />

                <div className="relative z-20 container mx-auto text-center max-w-4xl">
                    <Badge variant="outline" className="mb-6 px-4 py-1 text-primary border-primary/50 font-mono tracking-widest uppercase">
                        Curated Collection
                    </Badge>
                    <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter text-foreground mb-6 leading-none">
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-sans font-light leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Top Picks Section */}
            <section className="container mx-auto px-4 py-16 border-b border-border/50">
                <div className="flex items-center gap-2 mb-8">
                    <Flame className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-display font-bold uppercase tracking-wide">Must Cops</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topPicks.map((product, idx) => (
                        <Card key={product.id} className="relative group overflow-hidden bg-card border-border border-2 rounded-2xl">
                            <div className="absolute top-4 left-4 z-20">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-background font-black font-mono">
                                    {idx + 1}
                                </span>
                            </div>
                            <div className="aspect-square relative overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-display font-bold text-xl uppercase mb-2 truncate">{product.name}</h3>
                                <div className="flex justify-between items-end">
                                    <span className="font-mono text-primary text-lg font-bold">₹{product.price}</span>
                                    <Button size="sm" variant="outline" className="font-mono text-xs uppercase hover:bg-primary hover:text-black">
                                        Shop Now
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* The Collection */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex items-center gap-2 mb-8">
                    <Sparkles className="w-6 h-6 text-secondary" />
                    <h2 className="text-2xl font-display font-bold uppercase tracking-wide">The Feed</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
                    {allProducts.map((product) => (
                        <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-3 border border-border/50 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-glow-primary">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                                {product.isNew && (
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider font-mono">
                                        Fresh
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-sans font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                    {product.name}
                                </h3>
                                <p className="font-mono text-xs text-muted-foreground">
                                    ₹{product.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Button size="lg" variant="outline" className="border-border text-muted-foreground hover:text-foreground hover:border-foreground uppercase font-bold tracking-widest px-12">
                        Load More
                    </Button>
                </div>
            </section>
        </div>
    );
}
