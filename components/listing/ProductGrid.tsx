"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/product-card";

interface ProductGridProps {
    products: any[]; // Using any for brevity in mock interaction
}

export function ProductGrid({ products }: ProductGridProps) {
    if (!products || products.length === 0) {
        return (
            <div className="py-24 text-center">
                <div className="text-6xl mb-4">🔦</div>
                <h3 className="text-xl font-bold">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                visible: { transition: { staggerChildren: 0.05 } }
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 py-12"
        >
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                >
                    <ProductCard {...product} />
                </motion.div>
            ))}
        </motion.div>
    );
}
