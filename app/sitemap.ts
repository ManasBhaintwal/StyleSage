import { MetadataRoute } from "next";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://stylesage.com";

  // Static pages with detailed prioritization
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/anime`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/meme`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/custom`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Additional important pages
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/size-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/shipping-info`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/returns`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    // Lower priority pages
    {
      url: `${baseUrl}/auth`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: "never" as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: "never" as const,
      priority: 0.1,
    },
  ];

  try {
    await connectDB();

    // Dynamic pages - Products with better prioritization
    const products = await Product.find({ isActive: true })
      .select("slug updatedAt isFeatured tags")
      .lean();

    const productPages = products.map((product) => {
      let priority = 0.6; // Base priority

      // Increase priority for featured products
      if (product.isFeatured) {
        priority = 0.8;
      }

      // Increase priority for trending products
      if (
        product.tags?.includes("trending") ||
        product.tags?.includes("bestseller")
      ) {
        priority = Math.min(priority + 0.1, 0.9);
      }

      return {
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: "weekly" as const,
        priority,
      };
    });

    // Dynamic pages - Categories
    const categories = await Category.find({ isActive: true })
      .select("slug updatedAt")
      .lean();

    const categoryPages = categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(category.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Tag-based pages for better discoverability
    const popularTags = [
      "anime",
      "naruto",
      "dragon-ball-z",
      "attack-on-titan",
      "demon-slayer",
      "meme",
      "viral",
      "trending",
      "classic-meme",
      "bestseller",
      "custom",
      "personalized",
      "unique",
    ];

    const tagPages = popularTags.map((tag) => ({
      url: `${baseUrl}/tags/${tag}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));

    return [...staticPages, ...productPages, ...categoryPages, ...tagPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return only static pages if database connection fails
    return staticPages;
  }
}
