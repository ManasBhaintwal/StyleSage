"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
// Note: We'll assume react-dropzone is available or use standard inputs if not. 
// For safety in this environment without installing deps, I'll use standard HTML input logic styled nicely.

import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtUploaderProps {
    onUpload: (url: string) => void;
    currentArt: string | null;
    onRemove: () => void;
}

export function ArtUploader({ onUpload, currentArt, onRemove }: ArtUploaderProps) {
    const [isHovering, setIsHovering] = useState(false);

    const handleFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file);
            onUpload(url);
        }
    };

    return (
        <div className="space-y-4">
            {!currentArt ? (
                <label
                    className={cn(
                        "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all bg-surface/50 hover:bg-surface",
                        isHovering ? "border-primary bg-primary/5" : "border-white/10"
                    )}
                    onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
                    onDragLeave={() => setIsHovering(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsHovering(false);
                        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
                    }}
                >
                    <input
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg"
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    />
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <div className="p-3 bg-white/5 rounded-full mb-2">
                            <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <p className="font-bold text-foreground">Click to Upload Art</p>
                        <p className="text-xs">Drag & drop PNG or JPG (Max 10MB)</p>
                    </div>
                </label>
            ) : (
                <div className="relative bg-surface rounded-xl p-4 border border-white/10 flex items-center gap-4">
                    <div className="w-16 h-16 bg-black/50 rounded-lg overflow-hidden relative">
                        <img src={currentArt} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-sm">Custom_Art_Final.png</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-500 rounded-full font-bold">High Res</span>
                        </div>
                    </div>
                    <Button size="icon" variant="ghost" className="hover:text-red-500" onClick={onRemove}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            )}

            {/* Magic Tools */}
            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-3 justify-start gap-2 border-white/10 hover:border-primary/50" disabled={!currentArt}>
                    <Wand2 className="w-4 h-4 text-purple-400" />
                    <div className="text-left">
                        <div className="text-xs font-bold">Remove BG</div>
                        <div className="text-[10px] text-muted-foreground">AI Powered</div>
                    </div>
                </Button>
                <Button variant="outline" className="h-auto py-3 justify-start gap-2 border-white/10 hover:border-primary/50">
                    <ImageIcon className="w-4 h-4 text-blue-400" />
                    <div className="text-left">
                        <div className="text-xs font-bold">Effect Library</div>
                        <div className="text-[10px] text-muted-foreground">Browse Stickers</div>
                    </div>
                </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center pt-2">
                Tip: For best print quality, upload 3000px+ transparent PNGs.
            </p>
        </div>
    );
}
