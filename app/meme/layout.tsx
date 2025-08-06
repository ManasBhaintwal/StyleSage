import { Metadata } from "next";
import { createCategoryMetadata } from "@/lib/seo";

export const metadata: Metadata = createCategoryMetadata({
  categoryName: "Meme",
  description:
    "Showcase your internet culture knowledge with hilarious meme t-shirts. Featuring viral classics like Distracted Boyfriend, This is Fine Dog, and trending memes.",
  path: "/meme",
  productCount: 15,
});

export default function MemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const memeStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Meme T-Shirts Collection",
    description:
      "Hilarious meme-inspired t-shirt designs featuring viral internet classics and trending memes. Perfect for expressing your digital culture knowledge.",
    url: "https://stylesage.com/meme",
    isPartOf: {
      "@type": "WebSite",
      name: "StyleSage",
      url: "https://stylesage.com",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Meme T-Shirts",
      numberOfItems: 15,
      itemListElement: [
        {
          "@type": "Product",
          name: "This is Fine Dog",
          category: "Meme T-Shirts",
        },
        {
          "@type": "Product",
          name: "Drake Pointing Choice",
          category: "Meme T-Shirts",
        },
        {
          "@type": "Product",
          name: "Woman Yelling at Cat",
          category: "Meme T-Shirts",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(memeStructuredData),
        }}
      />
      {children}
    </>
  );
}
