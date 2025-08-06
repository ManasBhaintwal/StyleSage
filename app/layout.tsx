import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CombinedProviders } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { InitializeLocalStorage } from "@/components/initialize-storage";
import { createMetadata, generateOrganizationStructuredData } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = createMetadata({
  title: "Premium Custom T-Shirts | Anime, Meme & Personalized Designs",
  description:
    "Premium custom t-shirts with anime, meme & personalized designs. Quality organic cotton, XS-5XL sizing, fast India shipping.",
  keywords: [
    "custom t-shirts India",
    "anime t-shirts online",
    "meme t-shirts designs",
    "personalized clothing India",
    "premium t-shirts India",
    "custom apparel India",
    "graphic tees online",
    "organic cotton t-shirts",
    "plus size t-shirts India",
    "streetwear India",
    "otaku clothing",
    "internet culture fashion",
    "unique t-shirt designs",
    "quality t-shirts India",
    "fast shipping t-shirts",
    "affordable custom tees",
    "trendy t-shirts India",
    "StyleSage t-shirts",
    "online t-shirt store India",
    "custom printing India",
  ],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Favicons */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Performance hints */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* SEO meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Noida" />
        <meta name="geo.position" content="28.6139;77.2090" />
        <meta name="ICBM" content="28.6139, 77.2090" />

        {/* Structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <InitializeLocalStorage />
          <CombinedProviders>
            {children}
            <Toaster />
          </CombinedProviders>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
