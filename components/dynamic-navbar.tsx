"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCategories,
  getNavbarConfig,
  type Category,
  type NavbarConfig,
} from "@/lib/catalog";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Package } from "lucide-react";

interface DynamicNavbarProps {
  currentPath?: string;
}

export function DynamicNavbar({ currentPath = "" }: DynamicNavbarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadNavbarData = () => {
      try {
        const categoriesData = getCategories();
        const configData = getNavbarConfig();

        setCategories(categoriesData);
        setNavbarConfig(configData);
      } catch (error) {
        console.error("Failed to load navbar data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNavbarData();

    // Listen for storage changes to update navbar in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "stylesage_categories" || e.key === "stylesage_navbar") {
        loadNavbarData();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  if (!mounted || isLoading) {
    return (
      <>
        <nav className="hidden md:flex space-x-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </nav>
        <div className="md:hidden">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </>
    );
  }

  if (!navbarConfig) return null;

  // Get active categories in order
  // Always include 'collections' category, even if not active or missing
  let activeCategories = categories
    .filter(
      (cat) => navbarConfig.categories.includes(cat.id) && cat.id !== "custom"
    )
    .sort((a, b) => a.order - b.order);

  // If 'collections' is missing, add it from defaults
  if (!activeCategories.find((cat) => cat.id === "collections")) {
    activeCategories = [
      {
        id: "collections",
        name: "Collections",
        slug: "collections",
        description: "Our curated collections",
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ...activeCategories,
    ];
  }

  const activeLinks = navbarConfig.customLinks.filter((link) => link.isActive);

  const navLinks = [
    ...activeCategories.map((cat) => ({
      href: `/${cat.slug}`,
      label: cat.name,
    })),
    ...activeLinks.map((link) => ({ href: link.href, label: link.name })),
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex space-x-8">
        {activeCategories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className={`transition-colors ${
              currentPath === `/${category.slug}`
                ? "text-gray-900 dark:text-white font-medium border-b-2 border-blue-500"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {category.name}
          </Link>
        ))}

        {activeLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors ${
              currentPath === link.href
                ? "text-gray-900 dark:text-white font-medium border-b-2 border-purple-500"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-y-6 pt-6">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Package className="h-8 w-8" />
                <span className="text-xl font-bold">StyleSage</span>
              </Link>
              <nav className="flex flex-col gap-y-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-lg ${
                        currentPath === link.href
                          ? "text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
