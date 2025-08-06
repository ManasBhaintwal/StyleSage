import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Heart,
  Zap,
  Target,
  MapPin,
  Calendar,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Piyush Negi",
      role: "Co-Founder",
      image: "/piyush.jpeg?height=300&width=300&text=Piyush",
      description:
        "Visionary leader with a passion for creative expression and inclusive fashion.",
    },
    {
      name: "Manish Kumar",
      role: "Co-Founder",
      image: "/manish.jpeg?height=300&width=300&text=Manish",
      description:
        "Design genius who brings internet culture to life through premium apparel.",
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Inclusive Fashion",
      description:
        "We believe everyone deserves premium quality, from XS to 3XL with the same attention to detail.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Creative Expression",
      description:
        "Turning internet culture, memes, and anime into wearable art that speaks your language.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Gen Z Spirit",
      description:
        "Built by Gen Z, for Gen Z. We understand the culture because we live it every day.",
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: "Quality First",
      description:
        "Premium organic cotton and ethical manufacturing because your comfort matters.",
    },
  ];

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
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/collections"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Collections
                </Link>
                <Link
                  href="/anime"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Anime
                </Link>
                <Link
                  href="/meme"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Meme
                </Link>
                <Link
                  href="/custom"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Custom
                </Link>
                <Link
                  href="/about"
                  className="text-gray-900 dark:text-white font-medium border-b-2 border-purple-500"
                >
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Sign In
              </Button>
              <Link href="/cart">
                <Button
                  size="sm"
                  className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="bg-white text-purple-600 mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            Noida, India
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            About StyleSage
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We're a Gen Z startup from Noida, putting our creativity on t-shirts
            and making premium fashion accessible to everyone, regardless of
            size.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-600"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Founded 2025
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  Born from Creativity,
                  <span className="block text-purple-600">
                    Built for Everyone
                  </span>
                </h2>
              </div>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  StyleSage started in a small apartment in Noida with a simple
                  idea: why should awesome designs be limited by size? As Gen Z
                  creators, we saw the gap between internet culture and fashion,
                  between creativity and accessibility.
                </p>
                <p>
                  We're not just another t-shirt company. We're storytellers,
                  meme enthusiasts, anime lovers, and most importantly,
                  believers in inclusive fashion. Every design we create comes
                  from our hearts, and every size we offer comes from our
                  commitment to true inclusivity.
                </p>
                <p>
                  From XS to 3XL, from classic memes to custom anime designs, we
                  ensure the same premium quality and attention to detail.
                  Because great style shouldn't have size limits.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl overflow-hidden">
                <Image
                  src="/aboutCustomer.png?height=600&width=480&text=StyleSage+Team"
                  alt="StyleSage Team"
                  width={480}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-900/20 border dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    10,000+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Happy Customers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our values drive everything we do, from design to delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The creative minds behind StyleSage, bringing you the best in
              inclusive fashion
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-16">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="w-[27rem] text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <CardContent className="p-6">
                  <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Size Commitment */}
      <section className="py-20 bg-purple-50 dark:bg-purple-900/20 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Plus Size Promise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We're not just inclusive in name – we're inclusive in action. Our
              plus size range (XL-3XL) gets the same design attention, quality
              materials, and style innovation as our regular sizes. Because
              great fashion should never be an afterthought.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  XS - 3XL
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Complete size range
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  Same Quality
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  No compromises
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  Equal Love
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Every size matters
                </p>
              </div>
            </div>
            <Link href="/">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Shop All Sizes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 dark:bg-gray-800 text-white transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Express Yourself?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who've found their perfect fit and style
            with StyleSage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                Shop Collections
              </Button>
            </Link>
            <Link href="/custom">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                Create Custom Design
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
