"use client";

import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BrandStory() {
    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10 rotate-3 transition-transform hover:rotate-0 duration-500">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 z-10 mix-blend-overlay" />
                            {/* Placeholder for brand image */}
                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                <span className="font-heading text-[10rem] font-bold text-white/5">SAGE</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-8">
                        <h2 className="font-heading text-5xl md:text-6xl font-bold leading-none">
                            NOT JUST <br />
                            ANOTHER <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">MERCH STORE</span>
                        </h2>

                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Founded in 2024, <span className="text-white font-bold">StyleSage</span> was born from a frustration with cheap dropshipping quality.
                                We believe that anime and meme culture deserves premium representation.
                            </p>
                            <p>
                                Every garment is crafted from heavyweight organic cotton, with prints that don't crack after the first wash.
                                Whether you're repping your favorite arc or the latest viral moment, do it in style.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-white/5">
                                <span className="text-2xl">🌱</span>
                                <div>
                                    <h4 className="font-bold text-white">100% Organic</h4>
                                    <p className="text-sm text-muted-foreground">Certified sustainable cotton.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-white/5">
                                <span className="text-2xl">⚡</span>
                                <div>
                                    <h4 className="font-bold text-white">Durable Prints</h4>
                                    <p className="text-sm text-muted-foreground">DTG printing technology.</p>
                                </div>
                            </div>
                        </div>

                        <Link href="/about">
                            <Button size="lg" className="mt-4">
                                Read Our Story
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
