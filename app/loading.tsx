import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Skeleton */}
            <div className="w-full h-[80vh] bg-surface relative overflow-hidden mb-12 border-b border-light">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="w-[80%] h-32 rounded-3xl" />
                </div>
                <div className="absolute bottom-10 left-0 right-0 px-4 md:px-10 flex gap-4">
                    <Skeleton className="w-32 h-12 rounded-full" />
                    <Skeleton className="w-32 h-12 rounded-full" />
                </div>
            </div>

            <PageContainer>
                {/* Section Title */}
                <div className="space-y-4 mb-8 text-center">
                    <Skeleton className="w-48 h-8 mx-auto" />
                    <Skeleton className="w-96 h-4 mx-auto" />
                </div>

                {/* Product Grid Skeleton */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="space-y-3">
                            <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                    ))}
                </div>
            </PageContainer>
        </div>
    );
}
