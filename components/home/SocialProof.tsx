"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SocialProof() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 text-yellow-400 mb-2">
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                    </div>
                    <h2 className="font-heading text-4xl font-bold">Over 50,000 Happy Otakus</h2>
                    <p className="text-muted-foreground">
                        Don't just take our word for it. Join the community on Instagram directly.
                    </p>
                </div>

                {/* Masonry / Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px] md:h-[400px]">
                    {/* Item 1 */}
                    <div className="col-span-1 row-span-2 md:row-span-1 rounded-xl bg-surface overflow-hidden relative group">
                        <div className="absolute inset-0 bg-muted-foreground/10" />
                        {/* Image Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold">USER_01</div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold">@sasukefan99</span>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="col-span-1 rounded-xl bg-surface overflow-hidden relative group">
                        <div className="absolute inset-0 bg-muted-foreground/10" />
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold">USER_02</div>
                    </div>

                    {/* Item 3 */}
                    <div className="col-span-1 rounded-xl bg-surface overflow-hidden relative group">
                        <div className="absolute inset-0 bg-muted-foreground/10" />
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold">USER_03</div>
                    </div>

                    {/* Item 4 */}
                    <div className="col-span-1 row-span-2 md:row-span-1 rounded-xl bg-surface overflow-hidden relative group">
                        <div className="absolute inset-0 bg-muted-foreground/10" />
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold">USER_04</div>
                    </div>

                    {/* Item 5 (Desktop only filler) */}
                    <div className="hidden md:block col-span-2 rounded-xl bg-surface overflow-hidden relative group">
                        <div className="absolute inset-0 bg-muted-foreground/10" />
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold">USER_05</div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Button variant="outline" size="lg">Follow @StyleSage</Button>
                </div>
            </div>
        </section>
    );
}
