import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://stylesage.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/auth/callback/*",
          "/cart",
          "/checkout",
          "/orders",
          "/payment",
          "/success",
          "/_next/",
          "/debug-navbar",
          "/image-test",
          "/test-db",
          "/*.json$",
          "/private/*",
          "/tmp/*",
          "/logs/*",
        ],
        crawlDelay: 1,
      },
      // Allow specific search engines better access
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/auth/callback/*",
          "/cart",
          "/checkout",
          "/orders",
          "/payment",
          "/success",
          "/_next/",
          "/debug-navbar",
          "/image-test",
          "/test-db",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/auth/callback/*",
          "/cart",
          "/checkout",
          "/orders",
          "/payment",
          "/success",
          "/_next/",
          "/debug-navbar",
          "/image-test",
          "/test-db",
        ],
        crawlDelay: 1,
      },
      // Block AI crawlers
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "FacebookBot",
        disallow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
        disallow: ["/admin", "/api", "/auth/callback"],
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
        disallow: ["/admin", "/api", "/auth/callback"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
