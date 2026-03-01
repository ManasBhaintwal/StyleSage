import { DynamicTagPage } from "@/components/pages/DynamicTagPage";
import { Metadata } from "next";

type Props = {
    params: { tag: string };
};

export function generateMetadata({ params }: Props): Metadata {
    const title = params.tag.charAt(0).toUpperCase() + params.tag.slice(1).replace(/-/g, " ");
    return {
        title: `${title} Collection - StyleSage`,
        description: `Curated ${title} aesthetic from StyleSage.`,
    };
}

export default function TagPage({ params }: Props) {
    const tagDisplay = params.tag.replace(/-/g, " ").toUpperCase();

    // Determining caption based on tag
    let description = "Explore the vibration of the streets.";
    if (params.tag.includes("anime")) description = "Wear your obsession. The finest anime-inspired streetwear drops.";
    if (params.tag.includes("meme")) description = "Viral culture. Wearable humor. Unapologetically loud.";
    if (params.tag.includes("cyber")) description = "High-tech. Low-life. Future-ready gear for the concrete jungle.";

    // Mock Data
    const topPicks = [
        { id: "tp1", name: `${tagDisplay} grail 01`, slug: "grail-01", price: 2999, image: "/prod1.jpg", category: params.tag },
        { id: "tp2", name: `${tagDisplay} grail 02`, slug: "grail-02", price: 2499, image: "/prod2.jpg", category: params.tag },
        { id: "tp3", name: `${tagDisplay} grail 03`, slug: "grail-03", price: 1999, image: "/prod3.jpg", category: params.tag },
    ];

    const allProducts = Array.from({ length: 15 }).map((_, i) => ({
        id: `tag-p-${i}`,
        name: `${tagDisplay} Basic ${i + 1}`,
        slug: `${params.tag}-basic-${i + 1}`,
        price: 999 + (i * 50),
        image: `/prod${(i % 5) + 1}.jpg`,
        category: params.tag,
        isNew: i % 3 === 0
    }));

    return (
        <DynamicTagPage
            tag={params.tag}
            title={tagDisplay}
            description={description}
            topPicks={topPicks}
            allProducts={allProducts}
        />
    );
}
