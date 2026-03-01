"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const PRODUCTS = [
  { id: 101, name: "Neon Demon Tee", price: 1499, image: "/gokuTshirt.jpeg" },
  {
    id: 102,
    name: "Cyber Skull Hoodie",
    price: 2999,
    image: "/evolution.jpeg",
  },
  { id: 103, name: "Data Breath Pants", price: 2199, image: "/manish.jpeg" },
  { id: 104, name: "Glitch Vision Cap", price: 899, image: "/piyush.jpeg" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

export function NewDropsGrid() {
  return (
    <section className="container mx-auto px-4 py-24 border-t border-border/50">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="block font-mono text-primary text-sm uppercase tracking-widest mb-2">
            Fresh From The Lab
          </span>
          <h2 className="font-display font-black uppercase text-4xl md:text-6xl">
            New Drops
          </h2>
        </div>
        <Button
          variant="link"
          className="text-muted-foreground hover:text-white uppercase font-bold tracking-widest hidden md:block"
        >
          View All Drops
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            variants={item}
            className="group relative"
          >
            <div className="aspect-[4/5] bg-card rounded-xl overflow-hidden mb-4 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-white text-black font-bold uppercase text-[10px] tracking-wider">
                  New
                </Badge>
              </div>

              <button className="absolute bottom-3 right-3 w-10 h-10 bg-primary text-black rounded-full flex items-center justify-center translate-y-20 group-hover:translate-y-0 transition-transform duration-300 shadow-glow-primary">
                <Plus className="w-6 h-6" />
              </button>
            </div>

            <div>
              <h3 className="font-display font-bold uppercase text-lg group-hover:text-primary transition-colors cursor-pointer">
                {product.name}
              </h3>
              <p className="font-mono text-muted-foreground">
                ₹{product.price}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 text-center md:hidden">
        <Button
          variant="outline"
          className="w-full uppercase font-bold tracking-widest"
        >
          View All Drops
        </Button>
      </div>
    </section>
  );
}
