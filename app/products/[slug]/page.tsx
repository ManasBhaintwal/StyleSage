import { ProductClientPage } from "@/components/pages/ProductClientPage";
import { createProductMetadata, generateProductStructuredData } from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Fetch product data from API (or DB directly if preferred, but API keeps consistency)
async function getProduct(slug: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/products/${slug}`, {
            cache: 'no-store'
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct(params.slug);

    if (!product) {
        return {
            title: "Product Not Found | StyleSage",
        };
    }

    return createProductMetadata({
        product: {
            ...product,
            name: product.name,
            images: product.images,
            category: product.category,
        },
        path: `/products/${params.slug}`
    });
}

export default async function ProductPage({ params }: Props) {
    const product = await getProduct(params.slug);

    if (!product) {
        notFound();
    }

    const jsonLd = generateProductStructuredData({
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        images: product.images,
        rating: product.rating,
        reviews: product.reviews,
        category: product.category,
        sizes: product.sizes
    });

    // Mock related products for now, or fetch dynamically if API supports it
    const RELATED_PRODUCTS = [
        { id: "2", title: "Gojo Satoru Domain", price: 1499, category: "Anime", image: "/prod2.jpg", isNew: true },
        { id: "7", title: "Attack On Titan Levi", price: 1399, category: "Anime", image: "/prod7.jpg" },
        { id: "10", title: "Demon Slayer Tanjiro", price: 1199, category: "Anime", image: "/prod10.jpg" },
        { id: "11", title: "Naruto Sage Mode", price: 1299, category: "Anime", image: "/prod11.jpg" },
    ];

    // Transform API product shape to Client Component shape if needed
    const clientProduct = {
        id: product._id,
        title: product.name,
        tagline: product.tagline || "Premium Streetwear",
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating || 4.8,
        reviewCount: product.reviews || 0,
        description: product.description,
        images: product.images,
        sizes: product.sizes.map((s: string) => ({ id: s, label: s, available: true })), // Simple mapping
        colors: product.colors || [],
        category: product.category
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductClientPage product={clientProduct} relatedProducts={RELATED_PRODUCTS} />
        </>
    );
}
