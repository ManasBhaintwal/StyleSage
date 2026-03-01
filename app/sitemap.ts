import { MetadataRoute } from "next";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.stylesage.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/anime",
    "/meme",
    "/custom",
    "/collections",
    "/about",
    "/contact",
    "/faq",
    "/size-guide",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Fetch product slugs from the database
  let products: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const dbProducts = await Product.find({ isActive: true })
      .select("slug updatedAt")
      .lean();
    products = dbProducts.map((p: any) => ({
      url: `${BASE_URL}/products/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // Fallback: return routes without products if DB is unavailable
  }

  return [...routes, ...products];
}
