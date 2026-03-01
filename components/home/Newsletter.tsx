"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
    return (
        <section className="py-24 bg-main border-t border-white/5">
            <div className="container px-4 md:px-6">
                <div className="max-w-xl mx-auto text-center space-y-8">
                    <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                        Don't Miss The <span className="text-primary">Drop</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Be the first to know about new anime collections, limited edition memes, and exclusive offers.
                    </p>

                    <form className="flex w-full max-w-sm mx-auto items-center space-x-2" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-secondary/10 border-white/10 text-white placeholder:text-white/40 h-12"
                        />
                        <Button type="submit" variant="neon" className="h-12 w-32">
                            Subscribe
                        </Button>
                    </form>

                    <p className="text-xs text-muted-foreground/50">
                        By subscribing you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </section>
    );
}
