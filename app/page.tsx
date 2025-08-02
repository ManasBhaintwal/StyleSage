import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Star,
  Truck,
  Shield,
  Recycle,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { DynamicFeaturedProducts } from "@/components/dynamic-featured-products";
import { CartBadge } from "@/components/cart-badge";
import { DynamicNavbar } from "@/components/dynamic-navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                StyleSage
              </Link>
              <div className="hidden md:block">
                <DynamicNavbar />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="md:hidden">
                <DynamicNavbar />
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <ThemeToggle />
                <UserMenu />
                <CartBadge />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-800 overflow-hidden transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  New Collection
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Premium
                  <span className="block text-gray-600 dark:text-gray-300">
                    T-Shirts
                  </span>
                  <span className="block">Redefined</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
                  Crafted from the finest materials with attention to every
                  detail. Experience comfort that lasts and style that speaks.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  <Link href="/collections">
                    Shop Collection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 dark:border-gray-600 bg-transparent dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  View Lookbook
                </Button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    50K+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    4.9
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Organic Cotton
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Link href="/collections" className="block cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/gokuTshirt.jpeg?height=600&width=600"
                    alt="Premium T-Shirt Collection"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-900/20 border dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    4.9/5
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Based on 2,847 reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Free Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Free shipping on orders over ₹6225 worldwide
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quality Guarantee
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                30-day money back guarantee on all products
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Recycle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sustainable
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Made from 100% organic and recycled materials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Collection
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our most popular designs, crafted with premium materials
              and modern aesthetics
            </p>
          </div>

          <DynamicFeaturedProducts />

          <div className="text-center mt-12">
            <Link href="/collections">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 dark:border-gray-600 bg-transparent dark:text-gray-300 dark:hover:bg-gray-700"
              >
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Crafted for the
                <span className="block">Modern Individual</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Every thread tells a story of quality and craftsmanship. Our
                t-shirts are made from premium organic cotton, ensuring comfort
                that lasts and style that endures. We believe in creating pieces
                that become part of your daily ritual.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    100% Cotton
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Ethically Manufactured
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Carbon Neutral Shipping
                  </span>
                </div>
              </div>
              <Link href="/about" className="mt-6 inline-block">
                <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                  Learn Our Story
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Link href="/collections" className="block cursor-pointer">
                <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/evolution.jpeg?height=600&width=480"
                    alt="Our Manufacturing Process"
                    width={480}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plus Size Section */}
      <section className="py-16 bg-blue-50 dark:bg-blue-900/20 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                Inclusive Sizing
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Premium Quality in Every Size
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We believe everyone deserves premium comfort. Our t-shirts are
                available in sizes XS to 5XL, with the same attention to
                quality, fit, and style across our entire size range.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    XS-5XL
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Extended Size Range
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  From XS to 5XL, we've got the perfect fit for everyone
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">👕</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Same Premium Quality
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Every size maintains our high standards for comfort and
                  durability
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Thoughtful Design
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Carefully crafted cuts and proportions for the best fit in
                  every size
                </p>
              </div>
            </div>

            <div className="pt-8">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                View Size Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                StyleSage
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Premium t-shirts crafted by a Gen Z startup from Noida, putting
                creativity on every piece.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Shop
              </h4>
              <div className="space-y-2">
                <Link
                  href="/meme"
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Meme
                </Link>
                <Link
                  href="/anime"
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Anime
                </Link>
                <Link
                  href="/collections"
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Collections
                </Link>
                <Link
                  href="/custom"
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Custom
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Support
              </h4>
              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Contact
                </Link>
                <Link
                  href="/faq"
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  FAQ
                </Link>
                <Link
                  href="/returns"
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Returns
                </Link>
                <Link
                  href="/shipping"
                  className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Shipping
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 StyleSage. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
