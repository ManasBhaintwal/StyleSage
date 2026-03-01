import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-background pb-32 md:pb-12">
            <div className="container px-4 md:px-6 py-8 md:py-16">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">

                    {/* Left: Gallery Skeleton */}
                    <div className="lg:col-span-7 space-y-4">
                        <Skeleton className="aspect-[4/5] w-full rounded-2xl md:rounded-3xl" />
                        <div className="flex gap-4">
                            <Skeleton className="w-20 h-20 rounded-xl" />
                            <Skeleton className="w-20 h-20 rounded-xl" />
                            <Skeleton className="w-20 h-20 rounded-xl" />
                        </div>
                    </div>

                    {/* Right: Info Skeleton */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <Skeleton className="w-3/4 h-12" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-1/3 h-8 mt-4" />
                        </div>

                        {/* Variants */}
                        <div className="space-y-4">
                            <Skeleton className="w-20 h-4" />
                            <div className="flex gap-3">
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <Skeleton className="w-10 h-10 rounded-full" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Skeleton className="w-20 h-4" />
                            <div className="flex gap-2">
                                <Skeleton className="w-16 h-12 rounded-lg" />
                                <Skeleton className="w-16 h-12 rounded-lg" />
                                <Skeleton className="w-16 h-12 rounded-lg" />
                                <Skeleton className="w-16 h-12 rounded-lg" />
                            </div>
                        </div>

                        <div className="pt-8">
                            <Skeleton className="w-full h-14 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
