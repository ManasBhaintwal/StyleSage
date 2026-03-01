"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";

const UGC_IMAGES = [
    "/prod1.jpg", "/prod2.jpg", "/prod3.jpg", "/prod7.jpg", "/prod10.jpg", "/prod11.jpg"
]; // Reusing product images as mock UGC

export function CommunityWall() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm mb-6"
                    >
                        <Instagram className="w-5 h-5 text-accent" />
                        <span className="font-mono text-sm uppercase tracking-widest text-[#E1306C] font-bold">@StyleSage.Official</span>
                    </motion.div>
                    <h2 className="font-display font-black uppercase text-4xl md:text-6xl text-white mb-4">Join The <span className="text-stroke text-transparent stroke-white">Signal</span></h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Tag us in your fit checks to be featured on the main feed.</p>
                </div>

                {/* Focus Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 h-[600px] md:h-[800px] group/wall">
                    {UGC_IMAGES.map((src, i) => (
                        <div
                            key={i}
                            className={`relative overflow-hidden rounded-xl bg-gray-900 transition-all duration-500 hover:scale-95 group-hover/wall:opacity-40 hover:!opacity-100 hover:z-10 ${i === 1 ? 'md:row-span-2' : ''} ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                        >
                            <Image
                                src={src}
                                alt={`Community post ${i}`}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-110 grayscale hover:grayscale-0"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/40">
                                <span className="font-display font-bold text-xl uppercase tracking-widest text-white border-2 border-white px-6 py-2">View Post</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
