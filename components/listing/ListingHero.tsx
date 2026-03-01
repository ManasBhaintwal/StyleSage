import { cn } from "@/lib/utils";

interface ListingHeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    theme?: "cyan" | "magenta" | "default";
}

export function ListingHero({
    title,
    subtitle,
    backgroundImage = "https://grainy-gradients.vercel.app/noise.svg",
    theme = "default"
}: ListingHeroProps) {

    const themeColors = {
        cyan: "from-primary/20",
        magenta: "from-secondary/20",
        default: "from-white/5",
    };

    return (
        <div className="relative py-16 md:py-24 overflow-hidden border-b border-white/5">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className={cn("absolute inset-0 bg-gradient-to-b to-background", themeColors[theme])} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="container px-4 md:px-6 relative z-10 text-center">
                <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4 drop-shadow-xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
