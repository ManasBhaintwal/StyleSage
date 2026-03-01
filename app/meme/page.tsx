import { Metadata } from "next";
import { CollectionCarouselPage } from "@/components/pages/CollectionCarouselPage";

export const metadata: Metadata = {
  title: "Funny Meme T-Shirts & Hoodies | Viral Designs - StyleSage",
  description: "Wear the internet. Explore our collection of viral Meme T-Shirts and Hoodies. Premium quality, hilarious designs, and perfect for gifting.",
};

export default function MemePage() {
  return (
    <CollectionCarouselPage
      category="meme"
      title="Meme Lords"
      description="Where internet culture meets premium streetwear. Wear the joke, be the legend."
      gradientFrom="from-green-900/40"
      sections={[
        { id: "viral", title: "Viral Trends", tags: ["viral", "trending"] },
        { id: "classic", title: "Classic Memes", tags: ["classic-meme", "classic"] },
        { id: "chad", title: "Giga Chad", tags: ["chad"] },
        { id: "pepe", title: "Pepe & Friends", tags: ["pepe"] },
        { id: "doge", title: "Doge Core", tags: ["doge", "cheems"] },
      ]}
    />
  );
}
