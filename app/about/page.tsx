import { ContentLayout } from "@/components/content/ContentLayout";

export default function AboutPage() {
  return (
    <ContentLayout
      title="Our Story"
      subtitle="From a bedroom sketch to a global movement."
    >
      <div className="space-y-16">
        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold uppercase">
              The Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              StyleSage was born from a simple idea: Anime and Meme culture
              deserves premium representation. We were tired of cheap, scratchy
              merch with prints that faded after one wash.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We combine high-end organic cotton blanks with next-gen printing
              technology to create pieces that feel as good as they look. This
              isn't just merch; it's streetwear.
            </p>
          </div>
          <div className="relative aspect-square bg-surface rounded-2xl overflow-hidden border border-white/5">
            {/* Design element */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-secondary/20 to-primary/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-5xl font-black uppercase tracking-widest text-white/10">
                StyleSage
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          <h2 className="font-heading text-2xl font-bold uppercase text-center">
            The Journey
          </h2>
          <div className="border-l-2 border-white/10 pl-8 space-y-12 ml-4">
            <div className="relative">
              <span className="absolute -left-[41px] top-0 w-5 h-5 bg-primary rounded-full border-4 border-background" />
              <h3 className="font-bold text-xl text-primary">2023 - Day One</h3>
              <p className="text-muted-foreground mt-2">
                Started with 5 designs and a heat press in a garage.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[41px] top-0 w-5 h-5 bg-secondary rounded-full border-4 border-background" />
              <h3 className="font-bold text-xl text-secondary">
                2024 - Going Viral
              </h3>
              <p className="text-muted-foreground mt-2">
                The "Cyber-Samurai" tee hit 1M views on TikTok. We scaled to a
                warehouse.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[41px] top-0 w-5 h-5 bg-white rounded-full border-4 border-background" />
              <h3 className="font-bold text-xl text-white">2026 - Global</h3>
              <p className="text-muted-foreground mt-2">
                Shipping to 50+ countries. Launching the Custom Lab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
