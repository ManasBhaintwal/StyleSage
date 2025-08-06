import { Metadata } from "next";
import { createCategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = createCategoryMetadata({
  categoryName: "Collections",
  description:
    "Explore our curated collections of premium t-shirts featuring anime, meme, and custom designs. Discover unique styles that express your personality.",
  path: "/collections",
  productCount: 50,
});

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionsStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Premium T-Shirt Collections",
    description:
      "Curated collections of premium custom t-shirts featuring anime, meme, and personalized designs for every style and personality.",
    url: "https://stylesage.com/collections",
    isPartOf: {
      "@type": "WebSite",
      name: "StyleSage",
      url: "https://stylesage.com",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "All T-Shirt Collections",
      numberOfItems: 50,
      itemListElement: [
        {
          "@type": "Collection",
          name: "Anime Collection",
          description: "Premium anime-inspired t-shirt designs",
          url: "https://stylesage.com/anime",
        },
        {
          "@type": "Collection",
          name: "Meme Collection",
          description: "Hilarious internet meme t-shirts",
          url: "https://stylesage.com/meme",
        },
        {
          "@type": "Collection",
          name: "Custom Designs",
          description: "Personalized t-shirts with your own designs",
          url: "https://stylesage.com/custom",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionsStructuredData),
        }}
      />
      {children}
    </>
  );
}
