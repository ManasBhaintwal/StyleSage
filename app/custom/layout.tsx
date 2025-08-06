import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Custom T-Shirt Design - Create Your Unique Style",
  description:
    "Design your own custom t-shirt with our easy-to-use tools. Upload your artwork, add text, or choose from our templates. Premium quality printing on organic cotton.",
  path: "/custom",
  keywords: [
    "custom t-shirt design",
    "personalized t-shirts",
    "design your own t-shirt",
    "custom printing",
    "upload design t-shirt",
    "personalized clothing India",
    "custom apparel",
    "DIY t-shirt design",
  ],
});

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom T-Shirt Design Service",
    description:
      "Create your own custom t-shirt with personalized designs, text, and artwork on premium organic cotton.",
    url: "https://stylesage.com/custom",
    provider: {
      "@type": "Organization",
      name: "StyleSage",
      url: "https://stylesage.com",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    offers: {
      "@type": "Offer",
      name: "Custom T-Shirt Design",
      description:
        "Professional custom t-shirt printing service with high-quality materials",
      priceCurrency: "INR",
      price: "499",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "499",
        priceCurrency: "INR",
        minPrice: "499",
        maxPrice: "999",
      },
    },
    serviceType: "Custom Apparel Design",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(customStructuredData),
        }}
      />
      {children}
    </>
  );
}
