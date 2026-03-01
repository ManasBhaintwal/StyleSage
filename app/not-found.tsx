import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-background">
            <h1 className="font-heading text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
                404
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white">
                System Malfunction
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mb-8">
                The page you are looking for has been lost in the digital void or deleted by the algorithm.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                    <Button variant="neon" size="lg">
                        Return to Base
                    </Button>
                </Link>
                <Link href="/collections">
                    <Button variant="outline" size="lg">
                        Browse Collections
                    </Button>
                </Link>
            </div>
        </div>
    );
}
