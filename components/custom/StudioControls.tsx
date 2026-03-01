"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Shirt, Palette, Move, RotateCw, ZoomIn, Layers } from "lucide-react";
import { ArtUploader } from "./ArtUploader";
import { cn } from "@/lib/utils";

// Types
type ProductType = "tee" | "hoodie";

interface StudioControlsProps {
    productType: ProductType;
    setProductType: (t: ProductType) => void;
    color: string;
    setColor: (c: string) => void;
    size: string;
    setSize: (s: string) => void;
    currentArt: string | null;
    onArtUpload: (url: string) => void;
    onArtRemove: () => void;
    artTransform: { scale: number; rotation: number };
    updateArtTransform: (key: string, val: number) => void;
    price: number;
}

const COLORS = [
    { id: "#000000", bg: "bg-black", label: "Black" },
    { id: "#FFFFFF", bg: "bg-white", label: "White" },
    { id: "#1a1a1a", bg: "bg-neutral-900", label: "Charcoal" },
    { id: "#000080", bg: "bg-blue-900", label: "Navy" },
    { id: "#800000", bg: "bg-red-900", label: "Maroon" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

export function StudioControls({
    productType, setProductType,
    color, setColor,
    size, setSize,
    currentArt, onArtUpload, onArtRemove,
    artTransform, updateArtTransform,
    price
}: StudioControlsProps) {

    return (
        <div className="flex flex-col h-full bg-surface/50 backdrop-blur border-t border-white/5 md:border-t-0 md:border-l relative">

            <div className="p-4 border-b border-light flex items-center justify-between">
                <div>
                    <h2 className="font-heading font-bold text-lg">Custom Studio</h2>
                    <div className="font-mono text-primary font-bold">₹{price.toLocaleString()}</div>
                </div>
                <Button size="sm" variant="neon">Add to Bag</Button>
            </div>

            <Tabs defaultValue="product" className="flex-1 flex flex-col">
                <TabsList className="bg-transparent border-b border-light w-full justify-start px-4 h-12 rounded-none gap-4">
                    <TabsTrigger value="product" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2">
                        Product
                    </TabsTrigger>
                    <TabsTrigger value="art" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2">
                        Artwork
                    </TabsTrigger>
                    <TabsTrigger value="adjust" disabled={!currentArt} className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2 disabled:opacity-30">
                        Adjust
                    </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
                    {/* PRODUCT TAB */}
                    <TabsContent value="product" className="space-y-8 mt-0">
                        <div className="space-y-4">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Garment Type</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setProductType("tee")}
                                    className={cn("h-16 rounded-xl border-2 flex items-center justify-center gap-2 transition-all", productType === "tee" ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/30")}
                                >
                                    <Shirt className="w-5 h-5" /> Tee
                                </button>
                                <button
                                    onClick={() => setProductType("hoodie")}
                                    className={cn("h-16 rounded-xl border-2 flex items-center justify-center gap-2 transition-all", productType === "hoodie" ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/30")}
                                >
                                    <Layers className="w-5 h-5" /> Hoodie
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Grid Color</Label>
                            <div className="flex flex-wrap gap-3">
                                {COLORS.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => setColor(c.id)}
                                        className={cn(
                                            "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110",
                                            color === c.id ? "border-primary scale-110 ring-2 ring-primary ring-offset-2 ring-offset-black" : "border-white/20",
                                            c.bg
                                        )}
                                        title={c.label}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="uppercase text-xs font-bold text-muted-foreground">Size</Label>
                            <div className="flex flex-wrap gap-2">
                                {SIZES.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={cn(
                                            "w-12 h-10 rounded-lg border font-bold text-sm transition-all",
                                            size === s ? "border-primary bg-primary/10 text-primary" : "border-white/10 hover:border-white/30"
                                        )}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* ART TAB */}
                    <TabsContent value="art" className="mt-0">
                        <ArtUploader
                            currentArt={currentArt}
                            onUpload={onArtUpload}
                            onRemove={onArtRemove}
                        />
                    </TabsContent>

                    {/* ADJUST TAB */}
                    <TabsContent value="adjust" className="space-y-8 mt-0">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label className="flex items-center gap-2"><ZoomIn className="w-4 h-4 text-muted-foreground" /> Scale</Label>
                                    <span className="text-xs font-mono">{artTransform.scale.toFixed(1)}x</span>
                                </div>
                                <Slider
                                    value={[artTransform.scale]}
                                    min={0.5} max={2.0} step={0.1}
                                    onValueChange={([val]) => updateArtTransform("scale", val)}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label className="flex items-center gap-2"><RotateCw className="w-4 h-4 text-muted-foreground" /> Rotation</Label>
                                    <span className="text-xs font-mono">{Math.round(artTransform.rotation)}°</span>
                                </div>
                                <Slider
                                    value={[artTransform.rotation]}
                                    min={-180} max={180} step={5}
                                    onValueChange={([val]) => updateArtTransform("rotation", val)}
                                />
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <Button variant="outline" size="sm" className="w-full" onClick={() => {
                                    updateArtTransform("scale", 1);
                                    updateArtTransform("rotation", 0);
                                }}>
                                    Reset Adjustments
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
