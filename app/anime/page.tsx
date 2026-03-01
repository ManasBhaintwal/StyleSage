import { CollectionCarouselPage } from "@/components/pages/CollectionCarouselPage";

export default function AnimePage() {
  return (
    <CollectionCarouselPage
      category="anime"
      title="Anime Collection"
      description="Express your otaku spirit with our premium anime-inspired designs. From classic series to the latest hits, we've got the drip."
      gradientFrom="from-purple-900/40"
      sections={[
        { id: "naruto", title: "Naruto", tags: ["naruto"] },
        { id: "aot", title: "Attack on Titan", tags: ["attack-on-titan", "aot"] },
        { id: "dbz", title: "Dragon Ball Z", tags: ["dragon-ball-z", "dbz"] },
        { id: "op", title: "One Piece", tags: ["one-piece"] },
        { id: "jjk", title: "Jujutsu Kaisen", tags: ["jujutsu-kaisen", "jjk"] },
        { id: "ds", title: "Demon Slayer", tags: ["demon-slayer"] },
      ]}
    />
  );
}
