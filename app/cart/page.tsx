"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicNavbar } from "@/components/dynamic-navbar";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();
  const [coupon, setCoupon] = useState("");

  const updateQty = (id: string, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (delta > 0) {
      updateQuantity(id, item.quantity + 1);
    } else {
      if (item.quantity > 1) {
        updateQuantity(id, item.quantity - 1);
      } else {
        removeFromCart(id);
      }
    }
  };

  const removeItem = (id: string) => {
    removeFromCart(id);
  };

  const shipping = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DynamicNavbar />
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase mb-12">
            Your Cart <span className="text-primary">({items.length})</span>
          </h1>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-6 p-4 bg-card border border-border rounded-xl group"
                  >
                    <div className="relative w-24 h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display font-bold uppercase text-lg">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground font-mono">
                            {item.size} / {item.color}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="p-1 hover:bg-background rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-mono font-bold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="p-1 hover:bg-background rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="font-mono font-bold text-lg text-primary">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && (
                <div className="text-center py-24 border border-dashed border-border rounded-xl">
                  <p className="text-muted-foreground mb-4">
                    Your cart involves zero drip.
                  </p>
                  <Button variant="neon" asChild>
                    <Link href="/category/all">Start Shopping</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <h3 className="font-display font-bold uppercase text-xl">
                    Order Summary
                  </h3>

                  <div className="space-y-4 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>
                    <div className="pt-4 border-t border-border flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{total}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo Code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="bg-background border-border font-mono uppercase"
                    />
                    <Button variant="outline">Apply</Button>
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-14 bg-primary text-black font-bold uppercase tracking-widest hover:bg-primary/90"
                    asChild
                  >
                    <Link href="/checkout">
                      Checkout <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
