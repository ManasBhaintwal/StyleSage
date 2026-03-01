import { DynamicNavbar } from "@/components/dynamic-navbar";
import { ThreeDHero } from "@/components/home/ThreeDHero";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { VibeGrid } from "@/components/home/VibeGrid";
import { NewDropsGrid } from "@/components/home/NewDropsGrid";
import { CommunityWall } from "@/components/home/CommunityWall";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      <DynamicNavbar />

      <ThreeDHero />

      <TrendingCarousel />

      <VibeGrid />

      <NewDropsGrid />

      <CommunityWall />

      <Footer />
    </main>
  );
}
