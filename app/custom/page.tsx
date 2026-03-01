"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Download,
  Share2,
  Box,
  Layers,
  Type,
  Sticker,
  RotateCw,
  Move,
  Trash2,
  Plus,
  ShoppingCart,
  Shirt,
  Star,
  Heart,
  Zap,
  Smile,
  Ghost,
  Crown,
  Skull,
  Flame
} from "lucide-react";
import { DynamicNavbar } from "@/components/dynamic-navbar";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types
type LayerType = "text" | "sticker";

interface Layer {
  id: string;
  type: LayerType;
  content: string; // Text content or sticker icon name
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color: string;
  fontFamily?: string;
}

const SHIRT_COLORS = [
  { name: "Black", value: "#1a1a1a", border: "border-white/20" },
  { name: "White", value: "#ffffff", border: "border-gray-200" },
  { name: "Navy", value: "#1e3a8a", border: "border-blue-900" },
  { name: "Red", value: "#b91c1c", border: "border-red-900" },
  { name: "Charcoal", value: "#374151", border: "border-gray-600" },
];

const AVAILABLE_STICKERS = [
  "Star", "Heart", "Zap", "Smile", "Ghost", "Crown", "Skull", "Flame"
];

const FONTS = ["font-sans", "font-serif", "font-mono", "font-display"];

export default function CustomLabPage() {
  // State
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [baseColor, setBaseColor] = useState(SHIRT_COLORS[0]);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Cart & Toast
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Refs for drag logic
  const dragStartPos = useRef({ x: 0, y: 0 });
  const startLayerPos = useRef({ x: 0, y: 0 });

  // Add Layer Helper
  const addLayer = (type: LayerType, content: string) => {
    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      type,
      content,
      x: 50, // Percent
      y: 40, // Percent
      scale: 1,
      rotation: 0,
      color: type === 'text' ? "#ffffff" : "#ffffff",
      fontFamily: "font-sans"
    };
    setLayers([...layers, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  // Update Selected Layer Helper
  const updateSelectedLayer = (updates: Partial<Layer>) => {
    if (!selectedLayerId) return;
    setLayers(layers.map(l => l.id === selectedLayerId ? { ...l, ...updates } : l));
  };

  // Delete Layer
  const deleteSelectedLayer = () => {
    if (!selectedLayerId) return;
    setLayers(layers.filter(l => l.id !== selectedLayerId));
    setSelectedLayerId(null);
  };

  // Drag Logic (Simple implementation)
  const handleMouseDown = (e: React.MouseEvent, layerId: string) => {
    e.stopPropagation();
    setSelectedLayerId(layerId);
    setIsDragging(true);

    // Find layer to get current pos
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
      startLayerPos.current = { x: layer.x, y: layer.y };
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedLayerId) return;

    // Calculate delta in percentage (assuming canvas is approx 400px wide for simplicity of this demo logic)
    // Refine: We should use ref to canvas to get actual dimensions
    const deltaX = (e.clientX - dragStartPos.current.x) / 4; // approximate px to % conversion
    const deltaY = (e.clientY - dragStartPos.current.y) / 6;

    updateSelectedLayer({
      x: startLayerPos.current.x + deltaX,
      y: startLayerPos.current.y + deltaY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add to Cart Logic
  const handleAddToCart = () => {
    if (layers.length === 0) {
      toast({
        title: "Empty Design",
        description: "Please add some elements to your design before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    addToCart({
      productId: `custom-${Date.now()}`,
      name: "Custom Design T-Shirt",
      price: 2999,
      image: "/gokuTshirt.jpeg", // Placeholder for custom view, ideally generate thumbnail
      color: baseColor.name,
      size: "L", // Default size, could add selector
      quantity: 1,
      category: "custom"
    });

    toast({
      title: "Added to Cart",
      description: "Your custom masterpiece has been added to the cart.",
    });
  };

  const selectedLayer = layers.find(l => l.id === selectedLayerId);

  return (
    <div
      className="h-screen bg-[#050505] text-foreground flex flex-col overflow-hidden selection:bg-primary selection:text-black"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <DynamicNavbar currentPath="/custom" />

      {/* Workplace */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left: Tools */}
        <div className="w-20 border-r border-border flex flex-col items-center py-6 gap-6 bg-card/20 z-10">
          <div className="flex flex-col gap-2 items-center">
            <button
              onClick={() => addLayer('text', 'VISION')}
              className="p-3 rounded-xl bg-card border border-border hover:bg-primary hover:text-black hover:border-primary transition-all group"
              title="Add Text"
            >
              <Type className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">TEXT</span>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-3 rounded-xl bg-card border border-border hover:bg-primary hover:text-black hover:border-primary transition-all group"
                  title="Add Sticker"
                >
                  <Sticker className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 grid grid-cols-4 gap-2 p-2" side="right">
                {AVAILABLE_STICKERS.map((sticker) => (
                  <DropdownMenuItem key={sticker} onClick={() => addLayer('sticker', sticker)} className="flex items-center justify-center p-2 cursor-pointer">
                    {sticker === "Star" && <Star className="w-6 h-6" />}
                    {sticker === "Heart" && <Heart className="w-6 h-6" />}
                    {sticker === "Zap" && <Zap className="w-6 h-6" />}
                    {sticker === "Smile" && <Smile className="w-6 h-6" />}
                    {sticker === "Ghost" && <Ghost className="w-6 h-6" />}
                    {sticker === "Crown" && <Crown className="w-6 h-6" />}
                    {sticker === "Skull" && <Skull className="w-6 h-6" />}
                    {sticker === "Flame" && <Flame className="w-6 h-6" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-[10px] font-mono text-muted-foreground">STICKER</span>
          </div>

          <div className="flex flex-col gap-2 items-center mt-auto mb-4">
            <button
              onClick={() => setLayers([])}
              className="p-3 rounded-xl bg-card border border-border hover:bg-destructive hover:text-white hover:border-destructive transition-all"
              title="Clear All"
            >
              <Trash2 className="w-6 h-6" />
            </button>
            <span className="text-[10px] font-mono text-muted-foreground">CLEAR</span>
          </div>
        </div>

        {/* Center: Canvas */}
        <div className="flex-1 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5 relative flex items-center justify-center overflow-auto p-8">

          {/* View Toggle */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur p-1 rounded-full border border-border flex gap-1 z-20 shadow-xl">
            <button
              onClick={() => setViewMode('2D')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-colors ${viewMode === '2D' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
            >
              2D Editor
            </button>
            <button
              onClick={() => setViewMode('3D')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-colors ${viewMode === '3D' ? 'bg-primary text-black' : 'text-muted-foreground hover:text-foreground'}`}
            >
              3D Preview
            </button>
          </div>

          {/* The T-Shirt Canvas Area */}
          <div className="relative w-[500px] h-[600px] flex items-center justify-center transition-all duration-500">

            {viewMode === '2D' ? (
              <div className="relative w-full h-full group">
                {/* T-Shirt Base SVG representation */}
                <div
                  className="absolute inset-0 w-full h-full transition-colors duration-500 shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  style={{
                    backgroundColor: baseColor.value,
                    maskImage: "url('/tshirt-mask.png')", // Ideally we need a real mask image, for now using CSS shape/clip-path approximation or just a div
                    WebkitMaskImage: "url('/tshirt-mask.png')", // Fallback if image existed
                    // Fallback Shape for Demo if image missing:
                    clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)",
                    borderRadius: "2rem"
                  }}
                >
                  {/* Texture Overlay */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  {/* Shadow/Fold effects */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Editor Area (Safe Zone) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-20">
                  <div className="w-full h-full border border-dashed border-white/20 rounded-lg relative pointer-events-auto overflow-hidden">
                    {layers.map((layer) => (
                      <div
                        key={layer.id}
                        onMouseDown={(e) => handleMouseDown(e, layer.id)}
                        className={`absolute cursor-move select-none flex items-center justify-center ${selectedLayerId === layer.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-black' : ''}`}
                        style={{
                          left: `${layer.x}%`,
                          top: `${layer.y}%`,
                          transform: `translate(-50%, -50%) scale(${layer.scale}) rotate(${layer.rotation}deg)`,
                          color: layer.color
                        }}
                      >
                        {layer.type === 'text' ? (
                          <span className={`text-4xl font-bold whitespace-nowrap ${layer.fontFamily}`}>{layer.content}</span>
                        ) : (
                          <div className="w-20 h-20 text-current">
                            {layer.content === "Star" && <Star className="w-full h-full fill-current" />}
                            {layer.content === "Heart" && <Heart className="w-full h-full fill-current" />}
                            {layer.content === "Zap" && <Zap className="w-full h-full fill-current" />}
                            {layer.content === "Smile" && <Smile className="w-full h-full" />}
                            {layer.content === "Ghost" && <Ghost className="w-full h-full fill-current" />}
                            {layer.content === "Crown" && <Crown className="w-full h-full fill-current" />}
                            {layer.content === "Skull" && <Skull className="w-full h-full fill-current" />}
                            {layer.content === "Flame" && <Flame className="w-full h-full fill-current" />}
                            {!["Star", "Heart", "Zap", "Smile", "Ghost", "Crown", "Skull", "Flame"].includes(layer.content) && <Sticker className="w-full h-full" />}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center animate-pulse">
                <Layers className="w-32 h-32 text-primary mb-6 opacity-50" />
                <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-2">3D Rendering</h2>
                <p className="font-mono text-muted-foreground">Model generation in progress...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Properties Panel */}
        <div className="w-80 border-l border-border bg-card/20 backdrop-blur-sm p-6 flex flex-col gap-8 h-full overflow-y-auto">
          {/* Section: Base Product */}
          <div>
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 block">Base Product</Label>
            <h3 className="font-display font-black text-2xl uppercase mb-1">Oversized Tee</h3>
            <p className="text-sm text-muted-foreground mb-4">Premium Heavyweight Cotton</p>

            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">Color</Label>
            <div className="flex gap-3 flex-wrap">
              {SHIRT_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setBaseColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${color.value === baseColor.value ? 'ring-2 ring-primary ring-offset-2 ring-offset-black scale-110' : 'opacity-70'} ${color.border}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Section: Layer Properties */}
          {selectedLayer ? (
            <div className="animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-xs font-bold text-primary uppercase tracking-wider">Editing {selectedLayer.type}</Label>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10" onClick={deleteSelectedLayer}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {selectedLayer.type === 'text' && (
                  <div className="space-y-2">
                    <Label>Text Content</Label>
                    <Input
                      value={selectedLayer.content}
                      onChange={(e) => updateSelectedLayer({ content: e.target.value })}
                      className="bg-black/50 border-white/10"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Scale</Label>
                    <span className="text-xs font-mono text-muted-foreground">{selectedLayer.scale.toFixed(1)}x</span>
                  </div>
                  <Slider
                    value={[selectedLayer.scale]}
                    min={0.5}
                    max={3}
                    step={0.1}
                    onValueChange={([val]) => updateSelectedLayer({ scale: val })}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Rotation</Label>
                    <span className="text-xs font-mono text-muted-foreground">{Math.round(selectedLayer.rotation)}°</span>
                  </div>
                  <Slider
                    value={[selectedLayer.rotation]}
                    min={0}
                    max={360}
                    step={5}
                    onValueChange={([val]) => updateSelectedLayer({ rotation: val })}
                  />
                </div>

                {selectedLayer.type === 'text' && (
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex gap-2 flex-wrap">
                      {["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00"].map(c => (
                        <button
                          key={c}
                          onClick={() => updateSelectedLayer({ color: c })}
                          className={`w-6 h-6 rounded border border-white/20 ${selectedLayer.color === c ? 'ring-2 ring-primary' : ''}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-white/10 text-center text-muted-foreground bg-white/5">
              <p className="text-sm">Select a layer to edit properties</p>
            </div>
          )}

          {/* Section: Actions */}
          <div className="mt-auto space-y-3 pt-6 border-t border-white/10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Total Price</span>
              <span className="font-bold font-mono">₹2,999</span>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="w-full font-bold uppercase tracking-widest shadow-glow hover:shadow-glow-lg transition-all" variant="default">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button className="w-full" variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Design
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
