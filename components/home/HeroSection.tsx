"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-main pt-20"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
            </div>

            <div className="container px-4 md:px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <motion.div
                    style={{ y, opacity }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
                >
                    <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md shadow-glow-primary">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                        New Winter Collection Live
                    </div>

                    <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] font-display">
                        ANIME & MEME <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">
                            STREETWEAR
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-sans">
                        Premium organic cotton threads for the internet generation.
                        Designs that speak your language, quality that lasts.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                        <Link href="/anime" className="w-full sm:w-auto">
                            <Button size="lg" variant="neon" className="w-full h-14 text-lg font-bold font-display uppercase">
                                SHOP ANIME
                            </Button>
                        </Link>
                        <Link href="/collections" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full h-14 text-lg border-border hover:bg-muted font-display uppercase">
                                VIEW COLLECTIONS
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* 3D Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center perspective-[1000px]"
                >
                    {/* Card Stack */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-64 md:w-80 aspect-[3/4]"
                    >
                        {/* Back Card */}
                        <div className="absolute inset-0 bg-secondary/20 rounded-2xl transform translate-x-8 -translate-y-4 rotate-6 border border-border backdrop-blur-sm" />
                        {/* Middle Card */}
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl transform -translate-x-8 translate-y-4 -rotate-6 border border-border backdrop-blur-sm" />
                        {/* Front Card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-card to-background rounded-2xl border border-primary/20 shadow-2xl flex items-center justify-center overflow-hidden z-20">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                            <span className="font-heading text-9xl font-bold text-foreground/5 rotate-90 scale-150 font-display">
                                SAGE
                            </span>
                            {/* This would be the main product image */}
                            <div className="text-center">
                                <span className="text-6xl">👺</span>
                                <p className="mt-4 font-bold text-primary tracking-widest uppercase text-sm font-mono">Limited Edition</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
