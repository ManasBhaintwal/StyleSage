"use client";

import { useState } from "react";
import { StudioStage } from "@/components/custom/StudioStage";
import { StudioControls } from "@/components/custom/StudioControls";
import { PageContainer } from "@/components/layout/PageContainer";

export function CustomClientPage() {
    // State
    const [productType, setProductType] = useState<"tee" | "hoodie">("tee");
    const [color, setColor] = useState("#000000");
    const [size, setSize] = useState("L");

    const [currentArt, setCurrentArt] = useState<string | null>(null);
    const [artTransform, setArtTransform] = useState({
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0
    });

    // Price Logic
    const basePrice = productType === "tee" ? 999 : 1999;
    const printCost = currentArt ? 499 : 0;
    const totalPrice = basePrice + printCost;

    return (
        <div className="min-h-screen bg-background flex flex-col pt-16 md:pt-20">

            <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden">

                {/* LEFT / TOP: PREVIEW STAGE */}
                <div className="flex-1 relative bg-surface/50 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />

                    <StudioStage
                        productType={productType}
                        color={color}
                        artImage={currentArt}
                        artTransform={artTransform}
                        onArtUpdate={(newTransform) => setArtTransform(prev => ({ ...prev, ...newTransform }))}
                    />

                    {/* Mobile Hint */}
                    <div className="absolute top-4 left-4 md:hidden pointer-events-none">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest bg-black/50 backdrop-blur px-2 py-1 rounded">
                            Pinch to Zoom • Drag to Move
                        </span>
                    </div>
                </div>

                {/* RIGHT / BOTTOM: CONTROLS */}
                <div className="h-[40vh] md:h-auto md:w-[400px] lg:w-[450px] z-10 shadow-2xl">
                    <StudioControls
                        productType={productType} setProductType={setProductType}
                        color={color} setColor={setColor}
                        size={size} setSize={setSize}
                        currentArt={currentArt}
                        onArtUpload={(url) => {
                            setCurrentArt(url);
                            setArtTransform({ x: 0, y: 0, scale: 1, rotation: 0 }); // Reset on new upload
                        }}
                        onArtRemove={() => setCurrentArt(null)}
                        artTransform={artTransform}
                        updateArtTransform={(key, val) => setArtTransform(prev => ({ ...prev, [key]: val }))}
                        price={totalPrice}
                    />
                </div>

            </div>
        </div>
    );
}
