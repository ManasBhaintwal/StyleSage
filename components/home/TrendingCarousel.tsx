"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Types
interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    tags: string[];
}

export function TrendingCarousel() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                // Fetch products tagged 'trending' or similar
                const res = await fetch('/api/products?category=anime'); // Ideally we'd have a specific endpoint or tag filter, using anime for now as it has seeded trending items
                if (res.ok) {
                    const data = await res.json();
                    // Filter for items with 'trending' tag if possible, or just take first few
                    const trending = data.products.filter((p: any) => p.tags.includes('trending') || p.tags.includes('viral') || p.tags.includes('bestseller')).slice(0, 8);
                    setProducts(trending);
                }
            } catch (error) {
                console.error("Failed to fetch trending products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    // Create infinite list
    const MARQUEE_ITEMS = products.length > 0 ? [...products, ...products, ...products] : [];

    if (loading || products.length === 0) return null; // Or generic skeleton

    return (
        <section className="py-24 overflow-hidden bg-background border-y border-border relative">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />

            <div className="container mx-auto px-4 mb-12 relative z-20">
                <div className="flex items-center justify-between">
                    <h2 className="font-display font-black uppercase text-4xl md:text-6xl text-foreground">
                        The <span className="text-primary italic">Hype</span> Stream
                    </h2>
                    <Badge variant="outline" className="animate-pulse border-primary text-primary px-4 py-1.5 font-mono uppercase">
                        Live Feed
                    </Badge>
                </div>
            </div>

            <div className="flex w-full">
                <motion.div
                    className="flex gap-8 px-4"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {MARQUEE_ITEMS.map((item, idx) => (
                        <div key={`${item._id}-${idx}`} className="flex-shrink-0 w-[280px] md:w-[350px] group perspective-1000">
                            <Link href={`/products/${item.slug}`} className="block h-full">
                                <Card className="relative h-full aspect-[3/4] overflow-hidden bg-card border-border border-2 transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:scale-105 group-hover:shadow-glow-primary group-hover:z-10 bg-[#0a0a0a]">
                                    <Image
                                        src={item.images[0]}
                                        alt={item.name}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                                    />

                                    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge className="bg-primary text-black font-bold uppercase">{item.tags[0] || 'Trend'}</Badge>
                                            <span className="font-mono text-white text-lg font-bold">₹{item.price}</span>
                                        </div>
                                        <h3 className="font-display font-bold text-2xl uppercase text-white leading-none mb-4">{item.name}</h3>
                                        <button className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-primary transition-colors pointer-events-none">
                                            View Product
                                        </button>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
