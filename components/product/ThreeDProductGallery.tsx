"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

interface ThreeDProductGalleryProps {
    images: string[];
}

export function ThreeDProductGallery({ images }: ThreeDProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4 h-full sticky top-24">
            {/* Thumbnails (Left on Desktop, Bottom on Mobile) */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[70vh] scrollbar-none snap-x px-1 lg:w-24 flex-shrink-0">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedIndex(i)}
                        className={cn(
                            "relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300",
                            "snap-center",
                            selectedIndex === i
                                ? "border-primary shadow-glow-primary scale-105 z-10"
                                : "border-transparent opacity-60 hover:opacity-100 hover:border-white/20"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`View ${i + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Stage */}
            <div className="flex-1 relative aspect-[3/4] lg:aspect-auto lg:h-[82vh] rounded-3xl bg-card border border-border group perspective-1000 overflow-hidden cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 preserve-3d"
                        style={{
                            rotateX: isHovered ? rotateX : 0,
                            rotateY: isHovered ? rotateY : 0,
                            transformStyle: "preserve-3d"
                        }}
                    >
                        {/* Main Image Layer */}
                        <div className="relative w-full h-full transform-gpu transition-transform duration-100">
                            <Image
                                src={images[selectedIndex]}
                                alt="Product Main"
                                fill
                                className={cn(
                                    "object-cover transition-transform duration-200",
                                    isHovered ? "scale-110" : "scale-100"
                                )}
                                priority={selectedIndex === 0}
                            />
                        </div>

                        {/* Floating 3D Elements (Simulated Depth) */}
                        <motion.div
                            className="absolute top-8 right-8 z-20"
                            animate={{ z: 20 }}
                        >
                            <div className="bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 text-white/80">
                                <Maximize2 className="w-5 h-5" />
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Glitch Overlay on Hover */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 group-hover:opacity-10 mix-blend-overlay pointer-events-none transition-opacity duration-300" />
            </div>
        </div>
    );
}
