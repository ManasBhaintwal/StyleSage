import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <div className="w-full h-[40vh] bg-surface relative overflow-hidden mb-12 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Skeleton className="w-64 h-12 mx-auto" />
                    <Skeleton className="w-96 h-6 mx-auto" />
                </div>
            </div>

            <PageContainer>
                <div className="grid md:grid-cols-2 gap-8">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="aspect-[4/3] w-full rounded-3xl" />
                    ))}
                </div>
            </PageContainer>
        </div>
    );
}
