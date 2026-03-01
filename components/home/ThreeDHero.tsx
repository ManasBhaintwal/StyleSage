"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function ThreeDHero() {
  const prefersReducedMotion = useReducedMotion();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Parallax logic (disabled for reduced motion)
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "50%"],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 0.8],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 10],
  );

  // Mouse move tilt logic for "3D" feel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  return (
    <section
      ref={targetRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#050505] perspective-2000"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slower" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="absolute inset-0 z-10 container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-12">
        {/* Typography Layer */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 flex flex-col items-start space-y-8 z-20 pointer-events-none md:pointer-events-auto"
        >
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-primary text-sm tracking-[0.2em] uppercase"
            >
              <Sparkles className="inline-block w-4 h-4 mr-2 mb-1" />
              StyleSage Drop V.01
            </motion.h2>
            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Wear The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative inline-block">
                Glitch
                <motion.span
                  className="absolute inset-0 bg-primary/20 blur-xl -z-10"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl font-sans max-w-md border-l-2 border-primary/30 pl-6"
          >
            Streetwear for the digital native. Limited drops. Infinite vibe.
            Designed in Neo-Tokyo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-widest clip-path-slant group"
            >
              Shop Anime{" "}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg border-white/20 hover:border-white text-white font-bold uppercase tracking-widest backdrop-blur-sm"
            >
              Custom Lab
            </Button>
          </motion.div>
        </motion.div>

        {/* 3D Model Placeholder Layer */}
        <motion.div
          style={{ y, opacity, scale, rotate }}
          className="flex-1 w-full h-full max-h-[800px] flex items-center justify-center relative perspective-1000 group cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
        >
          <motion.div
            style={{ rotateX: springRotateX, rotateY: springRotateY }}
            className="relative w-[300px] md:w-[500px] aspect-[3/4] preserve-3d"
          >
            {/* Replace with generated image asset path when available. Using placeholder for structure. */}
            <div className="relative w-full h-full drop-shadow-[0_0_50px_rgba(204,255,0,0.2)]">
              <Image
                src="/assets/hero_hoodie_3d.png" // We will ensure this exists
                alt="3D Glitch Hoodie"
                fill
                className="object-contain filter drop-shadow-2xl"
                priority
              />
            </div>

            {/* Floating elements for depth */}
            <motion.div
              style={{ z: 50 }}
              className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/20 rounded-full blur-2xl border border-secondary/30"
              animate={prefersReducedMotion ? {} : { y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              style={{ z: 80 }}
              className="absolute bottom-20 -left-10 w-16 h-16 bg-primary/20 rounded-full blur-xl border border-primary/30"
              animate={prefersReducedMotion ? {} : { y: [0, 20, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 z-20"
        animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest font-mono">
          Scroll to explore
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
      </motion.div>
    </section>
  );
}

// Helper CSS for perspective
// We need to ensure 'perspective-2000', 'preserve-3d', 'clip-path-slant' utilities exist or are inline styles
// Adding clip-path-slant to globals or using style
