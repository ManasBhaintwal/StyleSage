"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Truck, ShieldCheck, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function ProductAccordionItem({ title, icon: Icon, children, defaultOpen = false }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-border">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 group"
            >
                <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary group-hover:animate-pulse" />
                    <span className="font-display font-medium text-lg uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
                        {title}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 text-muted-foreground leading-relaxed font-sans">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function ProductDetailsAccordion() {
    return (
        <div className="w-full">
            <ProductAccordionItem title="Highlights" icon={Sparkles} defaultOpen={true}>
                <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                    <li>100% Organic French Terry Cotton (450 GSM)</li>
                    <li>Slightly cropped, boxy fit for modern silhouette</li>
                    <li>High-density puff print on back</li>
                    <li>Acid-washed finish for vintage look</li>
                    <li>Ribbed cuffs and hem</li>
                </ul>
            </ProductAccordionItem>

            <ProductAccordionItem title="Care Instructions" icon={Info}>
                <p>Wash cold inside out with like colors. Do not bleach. Tumble dry low or hang dry to preserve print quality. Iron on reverse side only.</p>
            </ProductAccordionItem>

            <ProductAccordionItem title="Shipping & Returns" icon={Truck}>
                <p className="mb-2"><strong>Free Shipping</strong> on orders over ₹1500.</p>
                <p>Orders are processed within 24 hours. Standard delivery takes 3-5 business days. Express shipping options available at checkout.</p>
                <p className="mt-2 text-sm">We accept returns within 14 days of delivery for unworn items with original tags.</p>
            </ProductAccordionItem>
        </div>
    );
}
