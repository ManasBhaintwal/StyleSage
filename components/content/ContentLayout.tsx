import { cn } from "@/lib/utils";
import { DynamicNavbar } from "@/components/dynamic-navbar";
import { Footer } from "@/components/home/Footer";

interface ContentLayoutProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
}

export function ContentLayout({ title, subtitle, children, className }: ContentLayoutProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <DynamicNavbar />

            <div className="flex-1 pt-12 pb-20">
                {/* Header */}
                <div className="container px-4 md:px-6 mb-12 md:mb-16 text-center">
                    <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className={cn("container px-4 md:px-6 max-w-4xl mx-auto", className)}>
                    {children}
                </div>
            </div>

            <Footer />
        </div>
    );
}
