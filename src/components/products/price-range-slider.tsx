"use client";

import React, { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";

interface PriceRangeSliderProps {
  minLimit?: number;
  maxLimit?: number;
  currentMin?: number;
  currentMax?: number;
  onChange: (min: number, max: number) => void;
}

export function PriceRangeSlider({
  minLimit = 450,
  maxLimit = 1250,
  currentMin = 450,
  currentMax = 1250,
  onChange,
}: PriceRangeSliderProps) {
  const [minVal, setMinVal] = useState(currentMin);
  const [maxVal, setMaxVal] = useState(currentMax);

  useEffect(() => {
    setMinVal(currentMin);
    setMaxVal(currentMax);
  }, [currentMin, currentMax]);

  // Handle slider changes
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxVal - 50);
    setMinVal(val);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minVal + 50);
    setMaxVal(val);
  };

  // Commit changes after drag ends
  const handleCommit = () => {
    onChange(minVal, maxVal);
  };

  // Preset buttons
  const applyPreset = (min: number, max: number) => {
    setMinVal(min);
    setMaxVal(max);
    onChange(min, max);
  };

  const minPercent = ((minVal - minLimit) / (maxLimit - minLimit)) * 100;
  const maxPercent = ((maxVal - minLimit) / (maxLimit - minLimit)) * 100;

  return (
    <div className="space-y-4">
      {/* Price Labels */}
      <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
        <span>{formatPrice(minVal)}</span>
        <span className="text-zinc-500">—</span>
        <span>{formatPrice(maxVal)}</span>
      </div>

      {/* Dual Slider Track */}
      <div className="relative w-full h-5 flex items-center">
        {/* Background Track */}
        <div className="absolute w-full h-1 bg-zinc-800 rounded-full" />

        {/* Selected Colored Track */}
        <div
          className="absolute h-1 bg-orange-500 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min Input Slider */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minVal}
          onChange={handleMinChange}
          onMouseUp={handleCommit}
          onTouchEnd={handleCommit}
          className="absolute w-full h-1 appearance-none pointer-events-none bg-transparent accent-orange-500 z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />

        {/* Max Input Slider */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxVal}
          onChange={handleMaxChange}
          onMouseUp={handleCommit}
          onTouchEnd={handleCommit}
          className="absolute w-full h-1 appearance-none pointer-events-none bg-transparent accent-orange-500 z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-black [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      {/* Quick Preset Buttons */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        <button
          type="button"
          onClick={() => applyPreset(450, 717)}
          className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
            minVal === 450 && maxVal === 717
              ? "bg-orange-600/20 border-orange-500 text-orange-400"
              : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
        >
          Under ৳717
        </button>
        <button
          type="button"
          onClick={() => applyPreset(717, 983)}
          className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
            minVal === 717 && maxVal === 983
              ? "bg-orange-600/20 border-orange-500 text-orange-400"
              : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
        >
          ৳717–৳983
        </button>
        <button
          type="button"
          onClick={() => applyPreset(983, 1250)}
          className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
            minVal === 983 && maxVal === 1250
              ? "bg-orange-600/20 border-orange-500 text-orange-400"
              : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
        >
          ৳983+
        </button>
      </div>
    </div>
  );
}
