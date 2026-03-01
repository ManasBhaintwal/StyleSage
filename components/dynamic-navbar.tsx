"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Package, Info } from "lucide-react";
import { CartBadge } from "@/components/cart-badge";
import { ThemeToggle } from "@/components/theme-toggle";

const DEFAULT_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/anime", label: "Anime" },
  { href: "/meme", label: "Meme" },
  { href: "/custom", label: "Custom" },
];

interface DynamicNavbarProps {
  currentPath?: string;
}

export function DynamicNavbar({ currentPath = "" }: DynamicNavbarProps) {
  const [navLinks, setNavLinks] = useState(DEFAULT_NAV_LINKS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadNavbarData = async () => {
      try {
        // Fetch dynamic config
        const res = await fetch("/api/config/navbar");
        if (res.ok) {
          const data = await res.json();
          if (
            data.config &&
            data.config.content &&
            data.config.content.length > 0
          ) {
            setNavLinks(
              data.config.content.map((link: any) => ({
                href: link.href,
                label: link.label || link.name,
              })),
            );
          }
        }
      } catch (error) {
        console.error("Failed to load navbar data:", error);
        // DEFAULT_NAV_LINKS already set as initial state
      }
    };

    loadNavbarData();
  }, []);

  // Safe fallback for loading state
  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold font-display text-foreground uppercase tracking-widest hover:text-primary transition-colors"
          >
            <Package className="h-8 w-8 text-primary" />
            <span>StyleSage</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => {
              // Determine if active: strict match or prefix match for some cases
              const isActive =
                currentPath === link.href ||
                (link.href !== "/" && currentPath.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors font-sans uppercase tracking-wide text-sm ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:shadow-glow-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Actions & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <CartBadge />

          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-background border-r border-border"
              >
                <div className="flex flex-col gap-y-6 pt-6">
                  <Link href="/" className="flex items-center space-x-2 mb-4">
                    <Package className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold font-display text-foreground uppercase">
                      StyleSage
                    </span>
                  </Link>
                  <nav className="flex flex-col gap-y-4">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={`text-lg font-sans ${
                            currentPath === link.href
                              ? "text-primary font-bold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="flex items-center gap-4 mt-auto">
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
