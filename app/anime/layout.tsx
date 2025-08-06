import { Metadata } from "next";
import { createCategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = createCategoryMetadata({
  categoryName: "Anime",
  description:
    "Express your otaku spirit with our premium anime-inspired t-shirt designs. From classic series like Naruto, Dragon Ball Z, Attack on Titan to the latest hits.",
  path: "/anime",
  productCount: 20,
});

export default function AnimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const animeStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Anime T-Shirts Collection",
    description:
      "Premium anime-inspired t-shirt designs featuring popular series like Naruto, Dragon Ball Z, Attack on Titan, and more.",
    url: "https://stylesage.com/anime",
    isPartOf: {
      "@type": "WebSite",
      name: "StyleSage",
      url: "https://stylesage.com",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Anime T-Shirts",
      numberOfItems: 20,
      itemListElement: [
        {
          "@type": "Product",
          name: "Naruto Hokage Legacy",
          category: "Anime T-Shirts",
        },
        {
          "@type": "Product",
          name: "Dragon Ball Z Power",
          category: "Anime T-Shirts",
        },
        {
          "@type": "Product",
          name: "Attack on Titan Wings",
          category: "Anime T-Shirts",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(animeStructuredData),
        }}
      />
      {children}
    </>
  );
}
