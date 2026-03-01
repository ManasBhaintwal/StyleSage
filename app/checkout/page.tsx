"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Minimal Header */}
      <header className="h-20 border-b border-border flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-widest">Secure Checkout</span>
        </div>
      </header>

      <main className="flex-1 container max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10" />
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${s <= step ? 'bg-primary text-black' : 'bg-card border border-border text-muted-foreground'}`}>
              {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <h2 className="font-display font-black uppercase text-3xl">
            {step === 1 ? 'Contact Info' : step === 2 ? 'Shipping' : 'Payment'}
          </h2>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" className="h-12 bg-card border-border" />
                <Input placeholder="Last Name" className="h-12 bg-card border-border" />
              </div>
              <Input placeholder="Email Address" className="h-12 bg-card border-border" />
              <Input placeholder="Phone Number" className="h-12 bg-card border-border" />
              <Button onClick={() => setStep(2)} size="lg" className="w-full h-12 bg-primary text-black font-bold uppercase mt-4">Continue to Shipping</Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <Input placeholder="Address Line 1" className="h-12 bg-card border-border" />
              <Input placeholder="Apartment, suite, etc." className="h-12 bg-card border-border" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="City" className="h-12 bg-card border-border" />
                <Input placeholder="ZIP Code" className="h-12 bg-card border-border" />
              </div>
              <Button onClick={() => setStep(3)} size="lg" className="w-full h-12 bg-primary text-black font-bold uppercase mt-4">Continue to Payment</Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="bg-card border border-primary/50 p-6 rounded-xl text-center">
                <p className="text-muted-foreground mb-4">In a real app, Stripe/Razorpay would load here.</p>
                <Button size="lg" className="w-full h-14 bg-primary text-black font-bold uppercase tracking-widest shadow-glow-primary">
                  Pay & Place Order
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
