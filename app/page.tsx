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
import { Metadata } from "next";
import {
  createMetadata,
  generateWebsiteStructuredData,
  generateLocalBusinessStructuredData,
  generateFAQStructuredData,
  generateReviewAggregateStructuredData,
} from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title:
    "StyleSage - Premium Custom T-Shirts | Anime, Meme & Personalized Designs",
  description:
    "Shop premium custom t-shirts with anime, meme, and personalized designs. Quality organic cotton, inclusive sizing (XS-5XL), and fast shipping across India. Express your unique style with StyleSage.",
  keywords: [
    "custom t-shirts India",
    "anime t-shirts",
    "meme t-shirts",
    "personalized clothing",
    "premium t-shirts",
    "organic cotton t-shirts",
    "plus size t-shirts",
    "graphic tees India",
    "streetwear",
    "otaku clothing",
  ],
});

export default function HomePage() {
  // Enhanced structured data
  const websiteStructuredData = generateWebsiteStructuredData();
  const localBusinessStructuredData = generateLocalBusinessStructuredData();
  const faqStructuredData = generateFAQStructuredData();
  const reviewAggregateData = generateReviewAggregateStructuredData(4.8, 1250);

  // E-commerce specific structured data
  const ecommerceStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "StyleSage",
    url: "https://stylesage.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://stylesage.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Product catalog structured data
  const catalogStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "StyleSage Product Catalog",
    description:
      "Premium custom t-shirts featuring anime, meme, and personalized designs",
    numberOfItems: 50,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Anime T-Shirts",
        description: "Premium anime-inspired designs from popular series",
        url: "https://stylesage.com/anime",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Meme T-Shirts",
        description: "Hilarious internet culture and viral meme designs",
        url: "https://stylesage.com/meme",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Custom T-Shirts",
        description: "Personalized designs with your own artwork and text",
        url: "https://stylesage.com/custom",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewAggregateData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(catalogStructuredData),
        }}
      />
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
                <div className="md:hidden flex items-center space-x-1">
                  <UserMenu />
                  <CartBadge />
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

        {/* Customer Testimonials */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Join thousands of satisfied customers who love their StyleSage
                experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border dark:border-gray-700">
                <div className="space-y-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "The anime designs are absolutely incredible! As a huge One
                    Piece fan, I was blown away by the quality and attention to
                    detail. Will definitely order more!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                        AK
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Arjun Kumar
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Mumbai, Maharashtra
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border dark:border-gray-700">
                <div className="space-y-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "Finally found meme t-shirts that don't look cheap! The
                    quality is premium and the designs are hilarious. My friends
                    keep asking where I got them!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        PS
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Priya Sharma
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Delhi, NCR
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border dark:border-gray-700">
                <div className="space-y-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "The custom design service exceeded my expectations. They
                    brought my artwork to life perfectly. Plus, the organic
                    cotton feels amazing!"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        RG
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Rahul Gupta
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Bangalore, Karnataka
                      </div>
                    </div>
                  </div>
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
                  Free shipping on orders over ₹1199 worldwide
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
                  Money back if order cancelled before 7 days
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
                  Made from 100%{" "}
                  <a
                    href="https://www.organic-cotton.org/about-organic-cotton/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    organic cotton
                  </a>{" "}
                  and recycled materials
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
                Discover our most popular designs, crafted with premium
                materials and modern aesthetics
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
                  t-shirts are made from premium organic cotton, ensuring
                  comfort that lasts and style that endures. We believe in
                  creating pieces that become part of your daily ritual.
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
                      <a
                        href="https://www.fairtrade.org.uk/what-is-fairtrade/what-fairtrade-does/ethical-trading/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Ethically Manufactured
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      <a
                        href="https://www.carbontrust.com/our-work-and-impact/guides-reports-and-tools/carbon-neutral-shipping"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Carbon Neutral Shipping
                      </a>
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

        {/* Custom & Personalized Designs Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 mb-16">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  Custom Designs
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  Custom & Personalized T-Shirt Designs
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Create your unique style with our premium custom t-shirts.
                  From anime-inspired designs to viral meme graphics and
                  completely personalized artwork, StyleSage brings your
                  creative vision to life with exceptional quality and attention
                  to detail.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border dark:border-gray-700">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Anime T-Shirts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Express your otaku passion with premium anime designs. From
                    classic series to the latest trending shows, our{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Anime_and_manga_fandom"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      anime culture
                    </a>{" "}
                    t-shirts feature high-quality prints that capture the
                    essence of your favorite characters and moments.
                  </p>
                  <Link href="/anime" className="inline-block">
                    <Button variant="outline" size="sm">
                      Explore Anime Collection
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border dark:border-gray-700">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">😂</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Meme T-Shirts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Stay ahead of{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Internet_culture"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      internet culture
                    </a>{" "}
                    with our viral meme designs. From classic memes to trending
                    formats, our collection captures the humor and creativity of
                    online communities with premium quality printing.
                  </p>
                  <Link href="/meme" className="inline-block">
                    <Button variant="outline" size="sm">
                      Browse Meme Designs
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border dark:border-gray-700">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Personalized Designs
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create something truly unique with our personalized design
                    service. Upload your artwork, add custom text, or work with
                    our design team to create a one-of-a-kind t-shirt that
                    reflects your individual style and personality.
                  </p>
                  <Link href="/custom" className="inline-block">
                    <Button variant="outline" size="sm">
                      Start Customizing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 space-y-4">
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                All our custom and personalized t-shirts are printed on premium
                organic cotton using eco-friendly inks. We ensure every design
                maintains vibrant colors and sharp details that won't fade or
                crack over time.
              </p>
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Create Your Design
              </Button>
            </div>
          </div>
        </section>

        {/* Press & Recognition Section */}
        <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Recognition & Awards
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                StyleSage has been recognized for innovation in custom apparel
                and sustainable fashion practices
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Best Startup 2024
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Recognized as India's most innovative custom apparel startup
                  by TechCrunch India
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Sustainability Leader
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Featured in Sustainable Fashion Week for our eco-friendly
                  manufacturing processes
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Community Choice
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Winner of People's Choice Award at India Fashion Week for
                  anime-inspired designs
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Media inquiries and press kit available
              </p>
              <Button variant="outline" size="lg">
                <Link href="/press" className="flex items-center">
                  Download Press Kit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
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
                  available in sizes XS to 3XL, with the same attention to
                  quality, fit, and style across our entire size range.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      XS-3XL
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
                  Premium t-shirts crafted by a Gen Z startup from Noida,
                  putting creativity on every piece.
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
                    Meme Collection
                  </Link>
                  <Link
                    href="/anime"
                    className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Anime Collection
                  </Link>
                  <Link
                    href="/collections"
                    className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    All Collections
                  </Link>
                  <Link
                    href="/custom"
                    className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Custom Orders
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
    </>
  );
}
