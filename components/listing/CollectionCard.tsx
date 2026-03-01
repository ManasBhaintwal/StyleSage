"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CollectionCardProps {
    title: string;
    description: string;
    href: string;
    gradient: string;
    index: number;
}

export function CollectionCard({ title, description, href, gradient, index }: CollectionCardProps) {
    return (
        <Link href={href} className="group relative block w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="absolute inset-0"
            >
                {/* Background */}
                <div className={cn("absolute inset-0 bg-gradient-to-r transition-transform duration-700 group-hover:scale-105", gradient)} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                    <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">
                        {title}
                    </h2>
                    <p className="mt-4 text-lg md:text-xl text-white/80 max-w-lg opacity-80 group-hover:opacity-100 transition-opacity">
                        {description}
                    </p>
                    <span className="mt-8 px-6 py-2 rounded-full border border-white/30 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Explore Collection
                    </span>
                </div>
            </motion.div>
        </Link>
    );
}
