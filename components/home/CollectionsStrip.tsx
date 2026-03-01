"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const collections = [
    {
        id: "anime",
        title: "ANIME DROPS",
        subtitle: "Streetwear X Otaku Culture",
        image: "from-blue-900 to-indigo-900", // Placeholder gradient
        href: "/anime",
        accent: "text-primary",
    },
    {
        id: "meme",
        title: "DANK MEMES",
        subtitle: "Viral Trends & Classics",
        image: "from-purple-900 to-pink-900",
        href: "/meme",
        accent: "text-secondary",
    },
    {
        id: "custom",
        title: "CUSTOM LAB",
        subtitle: "Create Your Own Vibe",
        image: "from-emerald-900 to-teal-900",
        href: "/custom",
        accent: "text-green-400",
    },
];

export function CollectionsStrip() {
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container px-4 md:px-6 mb-12">
                <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight">
                    Curated <span className="text-muted-foreground/50">Collections</span>
                </h2>
            </div>

            {/* Cards Container */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 md:px-6 pb-12 scrollbar-none md:grid md:grid-cols-3 md:overflow-visible">
                {collections.map((collection, i) => (
                    <Link
                        key={collection.id}
                        href={collection.href}
                        className="snap-center shrink-0 w-[85vw] md:w-auto group relative h-[400px] rounded-2xl overflow-hidden border border-white/10"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="absolute inset-0"
                        >
                            {/* Background */}
                            <div
                                className={cn(
                                    "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110",
                                    collection.image
                                )}
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                <span className={cn("font-mono text-xs uppercase tracking-widest mb-2 opacity-80", collection.accent)}>
                                    Collection 0{i + 1}
                                </span>
                                <h3 className="font-heading text-4xl font-bold uppercase leading-none mb-2">
                                    {collection.title}
                                </h3>
                                <p className="text-muted-foreground text-sm group-hover:text-white transition-colors">
                                    {collection.subtitle}
                                </p>

                                {/* Decoration */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center -rotate-45">
                                        <span className="text-xl">↗</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Marquee */}
            <div className="relative border-y border-white/5 py-6 bg-black/20 backdrop-blur-sm overflow-hidden flex">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-xl font-heading font-bold text-white/20 uppercase tracking-widest flex items-center gap-8">
                            New Drops Weekly <span className="text-primary">•</span> Fast Shipping <span className="text-primary">•</span> Premium Cotton <span className="text-primary">•</span>
                        </span>
                    ))}
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-8 pl-8">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-xl font-heading font-bold text-white/20 uppercase tracking-widest flex items-center gap-8">
                            New Drops Weekly <span className="text-primary">•</span> Fast Shipping <span className="text-primary">•</span> Premium Cotton <span className="text-primary">•</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
