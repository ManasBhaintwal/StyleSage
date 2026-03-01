"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div className="space-y-4">
            <h3 className="font-display font-black text-2xl uppercase text-white">
              StyleSage
            </h3>
            <p className="text-gray-400">
              Neo-Tokyo Streetwear.
              <br />
              Digital fashion for the physical world.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/anime"
                  className="hover:text-primary transition-colors"
                >
                  Anime
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="hover:text-primary transition-colors"
                >
                  Streetwear
                </Link>
              </li>
              <li>
                <Link
                  href="/meme"
                  className="hover:text-primary transition-colors"
                >
                  Meme
                </Link>
              </li>
              <li>
                <Link
                  href="/custom"
                  className="hover:text-primary transition-colors"
                >
                  Custom Lab
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">
              Social
            </h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center text-gray-600 font-mono text-xs">
          © {new Date().getFullYear()} StyleSage. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
