import Link from "next/link";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/40 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-heading text-2xl font-bold tracking-tighter text-foreground"
            >
              STYLE<span className="text-primary">SAGE</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium streetwear for the otaku and meme generation. Designed for
              those who speak internet culture.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-foreground">
              SHOP
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/collections"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  All Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/anime"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Anime Edits
                </Link>
              </li>
              <li>
                <Link
                  href="/meme"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Dank Memes
                </Link>
              </li>
              <li>
                <Link
                  href="/custom"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Custom Printing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-foreground">
              SUPPORT
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/orders"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-foreground">
              CONTACT
            </h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground text-sm">
                Need help? <br />
                <a
                  href="mailto:support@stylesage.com"
                  className="text-primary hover:underline"
                >
                  support@stylesage.com
                </a>
              </li>
              <li className="text-muted-foreground text-sm pt-2">
                Mon - Fri: 9am - 6pm IST
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} StyleSage. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/faq"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/faq"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
