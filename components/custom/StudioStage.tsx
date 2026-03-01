"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface StudioStageProps {
    productType: "tee" | "hoodie";
    color: string;
    artImage: string | null;
    artTransform: { x: number; y: number; scale: number; rotation: number };
    onArtUpdate: (transform: { x: number; y: number; scale: number; rotation: number }) => void;
}

export function StudioStage({ productType, color, artImage, artTransform, onArtUpdate }: StudioStageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Simulated Drag Constraints
    // In a real implementation, we'd use a robust gesture library like use-gesture
    // For this demo, we assume the parent handles logic or we use simplified Framer Motion drag

    return (
        <div className="w-full h-full flex items-center justify-center p-4 md:p-8 bg-surface relative overflow-hidden">

            {/* Dynamic Background */}
            <div
                className="absolute inset-0 opacity-20 transition-colors duration-700"
                style={{ backgroundColor: color }}
            />

            {/* 3D Stage Container */}
            <div
                ref={containerRef}
                className="relative w-[350px] md:w-[500px] aspect-[3/4] preserve-3d transition-transform duration-500"
                style={{ perspective: "1000px" }}
            >
                <motion.div
                    className="w-full h-full relative"
                    initial={false}
                    animate={{ rotateY: 0 }} // Could add subtle rotation on interaction
                >
                    {/* 1. PRODUCT BASE (Dynamic Color) */}
                    {/* Using a mask or mix-blend mode is best. Here we simulate with a color block clipped to shape if we lack assets. */}
                    {/* Ideally: <Image src="/tee-base.png" ... className="mix-blend-multiply" /> */}

                    <div
                        className={cn(
                            "absolute inset-0 transition-colors duration-500 shadow-2xl",
                            productType === "tee" ? "rounded-[3rem] rounded-b-[4rem]" : "rounded-t-[5rem] rounded-b-[3rem]"
                        )}
                        style={{
                            backgroundColor: color,
                            // Simulate shirt shape roughly for fallback
                            clipPath: productType === "tee"
                                ? "polygon(20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)"
                                : "polygon(25% 0%, 75% 0%, 100% 25%, 100% 95%, 0% 95%, 0% 25%)"
                        }}
                    />

                    {/* 2. TEXTURE OVERLAY (Wrinkles/Shadows) */}
                    {/* This would be a transparent PNG with multiply blend mode */}
                    <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-gradient-to-tr from-black/50 via-transparent to-white/20" />

                    {/* 3. ART LAYER (The User's Design) */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                        {/* Print Area Boundary */}
                        <div className="w-[60%] h-[50%] border border-white/10 border-dashed relative">
                            {artImage && (
                                <motion.img
                                    src={artImage}
                                    alt="Custom Print"
                                    drag
                                    dragConstraints={containerRef} // Rough constraint
                                    dragElastic={0.1}
                                    dragMomentum={false}
                                    className="w-full h-full object-contain cursor-move pointer-events-auto filter drop-shadow-lg mix-blend-multiply"
                                    style={{
                                        x: artTransform.x,
                                        y: artTransform.y,
                                        scale: artTransform.scale,
                                        rotate: artTransform.rotation
                                    }}
                                    onDragEnd={(_, info) => {
                                        onArtUpdate({ ...artTransform, x: artTransform.x + info.offset.x, y: artTransform.y + info.offset.y });
                                    }}
                                />
                            )}
                            {!artImage && (
                                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm font-bold uppercase tracking-widest text-center">
                                    Print Area <br /> (Upload Art)
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 4. DETAILS (Neck, Arms simulation) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/20 rounded-b-full backdrop-blur-sm" />

                </motion.div>
            </div>

            {/* Helper text */}
            <div className="absolute top-4 left-0 right-0 text-center pointer-events-none">
                <span className="bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white/70">
                    {productType === "tee" ? "Premium Heavyweight Tee" : "Ultra-Soft Hoodie"}
                </span>
            </div>
        </div>
    );
}
