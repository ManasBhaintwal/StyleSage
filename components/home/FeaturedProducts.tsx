"use client";

import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Mock data (replace with real fetch later)
const products = [
    { id: "1", title: "Cyber-Samurai Tee", price: 1299, category: "Anime", image: "/prod1.jpg", isNew: true },
    { id: "2", title: "Gojo Satoru Domain", price: 1499, category: "Anime", image: "/prod2.jpg", isNew: true },
    { id: "3", title: "Doge To The Moon", price: 999, category: "Meme", image: "/prod3.jpg" },
    { id: "4", title: "Vaporwave Glitch", price: 1199, category: "Streetwear", image: "/prod4.jpg" },
    { id: "5", title: "Pixel Art Hood", price: 2499, category: "Custom", image: "/prod5.jpg" },
    { id: "6", title: "Sad Pepe Vintage", price: 1099, category: "Meme", image: "/prod6.jpg" },
    { id: "7", title: "Attack On Titan Levi", price: 1399, category: "Anime", image: "/prod7.jpg" },
    { id: "8", title: "Neon Tokyo Night", price: 1299, category: "Streetwear", image: "/prod8.jpg" },
];

export function FeaturedProducts() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                            Trending <span className="text-secondary">Now</span>
                        </h2>
                        <p className="text-muted-foreground max-w-md">
                            The streets are talking. Here's what everyone is wearing this week.
                        </p>
                    </div>
                    <Link href="/collections" className="hidden md:block">
                        <Button variant="ghost" className="gap-2">
                            View All <LinkIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/collections">
                        <Button variant="outline" className="w-full">
                            View All Products
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
