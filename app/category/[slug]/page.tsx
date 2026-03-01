import { DynamicCategoryPage } from "@/components/pages/DynamicCategoryPage";
import { Metadata } from "next";

type Props = {
    params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
    const title = params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, " ");
    return {
        title: `${title} - StyleSage Collection`,
        description: `Explore our premium ${title} collection.`,
    };
}

export default function CategoryPage({ params }: Props) {
    const title = params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, " ");

    return (
        <DynamicCategoryPage
            categorySlug={params.slug}
            title={title}
            description={`Discover the latest ${title} trends from the streets of Neo-Tokyo. Premium quality, limited drops.`}
        />
    );
}
