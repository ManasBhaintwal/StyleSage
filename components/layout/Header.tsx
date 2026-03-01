"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "Anime", href: "/anime" },
    { name: "Meme", href: "/meme" },
    { name: "Custom", href: "/custom" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-border/40 py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors">
                        STYLE<span className="text-primary">SAGE</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary uppercase tracking-wide",
                                pathname === link.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden md:flex relative items-center">
                        <AnimatePresence>
                            {isSearchOpen ? (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 200, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="mr-2 overflow-hidden"
                                >
                                    <Input
                                        type="search"
                                        placeholder="Search..."
                                        className="h-9 w-[200px] bg-secondary/50 border-transparent focus:border-primary px-3 text-xs"
                                        autoFocus
                                        onBlur={() => !isSearchOpen && setIsSearchOpen(false)}
                                    />
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>

                    <Link href="/auth">
                        <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-primary">
                            <User className="h-5 w-5" />
                        </Button>
                    </Link>

                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                0
                            </span>
                        </Button>
                    </Link>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l-border/40 bg-background/95 backdrop-blur-xl">
                            <div className="flex flex-col gap-8 mt-8">
                                <Link href="/" className="font-heading text-2xl font-bold tracking-tighter">
                                    STYLE<span className="text-primary">SAGE</span>
                                </Link>
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                "text-lg font-medium transition-colors hover:text-primary border-b border-border/40 pb-2",
                                                pathname === link.href ? "text-primary border-primary" : "text-muted-foreground"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="flex flex-col gap-4 mt-auto">
                                    <Button variant="outline" className="w-full justify-start gap-2">
                                        <User className="h-4 w-4" /> Account
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start gap-2">
                                        <Search className="h-4 w-4" /> Search
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
