"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
    value: number[];
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (val: number[]) => void;
    className?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, value, min = 0, max = 100, step = 1, onValueChange, ...props }, ref) => {

        // Simple wrapper around input range for now to avoid dependency hell
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseFloat(e.target.value);
            onValueChange?.([val]);
        };

        return (
            <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value?.[0] ?? min}
                    onChange={handleChange}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Slider.displayName = "Slider"

export { Slider }
