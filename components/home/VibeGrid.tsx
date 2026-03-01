"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface VibeCardProps {
    title: string;
    description: string;
    image: string;
    className?: string;
    href: string;
    delay?: number;
}

function VibeCard({ title, description, image, className, href, delay = 0 }: VibeCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} // smooth ease
            className={cn("relative group overflow-hidden rounded-3xl cursor-pointer bg-card border border-white/5", className)}
        >
            <Link href={href} className="block w-full h-full">
                {/* Background Image/Video */}
                <div className="absolute inset-0 z-0 bg-gray-900">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" // Image zoom
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-baseline justify-between mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            <span className="font-mono text-xs uppercase tracking-widest text-primary">{description}</span>
                            <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-display font-black text-4xl md:text-5xl uppercase text-white leading-[0.85] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                            {title}
                        </h3>
                    </div>
                </div>

                {/* Hover Glitch Overlay (Pseudo) */}
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </Link>
        </motion.div>
    );
}

export function VibeGrid() {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="mb-16 text-center">
                <h2 className="font-display font-black uppercase text-5xl md:text-7xl mb-4">Enter The <span className="text-stroke text-transparent stroke-white">Matrix</span></h2>
                <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Select your aesthetic. Curated collections for every glitch in the system.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                {/* Large Block - Anime */}
                <VibeCard
                    title="Anime"
                    description="Wear Your Obsession"
                    image="/gokuTshirt.jpeg"
                    href="/anime"
                    className="md:col-span-2 md:row-span-2"
                    delay={0}
                />

                {/* Tall Block - Streetwear */}
                <VibeCard
                    title="Street"
                    description="Concrete Jungle Gear"
                    image="/evolution.jpeg"
                    href="/category/streetwear"
                    className="md:col-span-1 md:row-span-2"
                    delay={0.1}
                />

                {/* Medium Block - Meme */}
                <VibeCard
                    title="Meme"
                    description="Viral Culture"
                    image="/manish.jpeg"
                    href="/meme"
                    className="md:col-span-1 md:row-span-1"
                    delay={0.2}
                />

                {/* Wide Block - Custom */}
                <VibeCard
                    title="Lab"
                    description="Create Your Own"
                    image="/placeholder.svg"
                    href="/custom"
                    className="md:col-span-1 md:row-span-1"
                    delay={0.3}
                />
            </div>
        </section>
    );
}
