"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DynamicNavbar } from "@/components/dynamic-navbar";
import { Footer } from "@/components/home/Footer";

interface SectionConfig {
    id: string;
    title: string;
    tags: string[];
}

interface CollectionCarouselPageProps {
    category: string;
    title: string;
    description: string;
    gradientFrom?: string;
    sections?: SectionConfig[];
}

interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    images: string[];
    tags: string[];
}

export function CollectionCarouselPage({
    category,
    title,
    description,
    gradientFrom = "from-primary/10",
    sections
}: CollectionCarouselPageProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dynamicSections, setDynamicSections] = useState<SectionConfig[] | undefined>(sections);
    const [pageConfig, setPageConfig] = useState<{ title: string, description: string } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // 1. Fetch Products
                const productRes = await fetch(
                    `/api/products?category=${category}&isActive=true&_t=${Date.now()}`
                );

                // 2. Fetch Config (if not hardcoded sections provided, or even if they are, we might want to override)
                // For this implementation, let's prefer dynamic if available, fallback to props.
                const configRes = await fetch(`/api/collections/${category}`);

                if (productRes.ok) {
                    const data = await productRes.json();
                    setProducts(data.products || []);
                }

                if (configRes.ok) {
                    const data = await configRes.json();
                    if (data.config) {
                        if (data.config.sections && data.config.sections.length > 0) {
                            setDynamicSections(data.config.sections);
                        }
                        setPageConfig({
                            title: data.config.title || title,
                            description: data.config.description || description
                        });
                    }
                }

            } catch (err) {
                setError("Failed to load collection");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, title, description]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Helper to render a carousel row
    const renderCarousel = (items: Product[], key: string, sectionTitle?: string) => {
        if (items.length === 0) return null;
        const marqueeItems = [...items, ...items, ...items]; // Triple for loop

        return (
            <div key={key} className="py-12 border-b border-border/50 relative">
                {sectionTitle && (
                    <div className="container mx-auto px-4 mb-8">
                        <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-foreground">
                            {sectionTitle}
                        </h2>
                    </div>
                )}
                <div className="flex w-full overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex gap-8 px-4"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{ duration: Math.max(30, items.length * 5), repeat: Infinity, ease: "linear" }}
                        whileHover={{ animationPlayState: "paused" }}
                    >
                        {marqueeItems.map((item, idx) => (
                            <div key={`${key}-${item._id}-${idx}`} className="flex-shrink-0 w-[240px] md:w-[320px] group perspective-1000">
                                <Link href={`/products/${item.slug || item._id}`}>
                                    <Card className="relative aspect-[3/4] overflow-hidden bg-card border-border border-2 transform transition-transform duration-500 group-hover:rotate-y-6 group-hover:scale-105 group-hover:shadow-glow-primary group-hover:z-10 bg-[#0a0a0a]">
                                        <Image
                                            src={item.images[0] || "/placeholder.svg"}
                                            alt={item.name}
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                                        />

                                        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex justify-between items-start mb-2">
                                                {item.tags.includes("new") && <Badge className="bg-primary text-black font-bold uppercase">New</Badge>}
                                                <span className="font-mono text-white text-lg font-bold">₹{item.price}</span>
                                            </div>
                                            <h3 className="font-display font-bold text-xl uppercase text-white leading-none mb-4">{item.name}</h3>
                                            <div className="w-full py-2 bg-white text-black font-bold uppercase tracking-wider text-center text-sm hover:bg-primary transition-colors">
                                                View
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
            <DynamicNavbar />

            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black pb-20">
                <div className={`absolute inset-0 bg-gradient-to-b ${gradientFrom} to-transparent opacity-50`} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                <div className="relative z-10 text-center px-4 max-w-4xl pt-20">
                    <span className="block font-mono text-primary text-sm uppercase tracking-[0.2em] mb-4 animate-pulse">
                        Collection
                    </span>
                    <h1 className="text-6xl md:text-9xl font-display font-black uppercase text-white tracking-tighter mb-4 leading-none">
                        {pageConfig?.title || title}
                    </h1>
                    <p className="text-muted-foreground text-xl max-w-lg mx-auto">
                        {pageConfig?.description || description}
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 pb-20 bg-background relative border-t border-primary/20">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />

                {products.length === 0 ? (
                    <div className="w-full text-center py-20 z-20 relative">
                        <p className="text-muted-foreground text-xl">No products found in this collection (yet).</p>
                        <Button variant="link" asChild className="mt-4">
                            <Link href="/">Return Home</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {dynamicSections ? (
                            // Render defined sections (dynamic or static prop)
                            dynamicSections.map((section) => {
                                const sectionProducts = products.filter(p =>
                                    p.tags.some(tag => section.tags.includes(tag))
                                );
                                return renderCarousel(sectionProducts, section.id, section.title);
                            })
                        ) : (
                            // Render single All items carousel (fallback)
                            renderCarousel(products, "all")
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
