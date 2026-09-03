"use client";

import { PriceRangeSlider } from "./price-range-slider";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";

interface ProductFiltersProps {
  categories?: { label: string; value: string; count?: number }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;

  fabricTypes?: { label: string; value: string; count?: number }[];
  selectedFabrics: string[];
  onToggleFabric: (fabric: string) => void;

  minPrice: number;
  maxPrice: number;
  currentMinPrice: number;
  currentMaxPrice: number;
  onPriceChange: (min: number, max: number) => void;

  onResetFilters: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const defaultCategories = [
  { label: "All", value: "all", count: 48 },
  { label: "Basic", value: "basic", count: 18 },
  { label: "Premium", value: "premium", count: 30 },
];

const defaultFabrics = [
  { label: "Waffle Texture Stripe Cotton", value: "waffle-cotton", count: 12 },
  { label: "Woolen Luxury Blend", value: "woolen", count: 8 },
  { label: "Cozy Fit Linen Drop", value: "linen", count: 14 },
  { label: "Printed Cuban Silk", value: "silk-printed", count: 14 },
];

export function ProductFilters({
  categories = defaultCategories,
  selectedCategory = "all",
  onSelectCategory,
  fabricTypes = defaultFabrics,
  selectedFabrics = [],
  onToggleFabric,
  minPrice = 450,
  maxPrice = 1250,
  currentMinPrice = 450,
  currentMaxPrice = 1250,
  onPriceChange,
  onResetFilters,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}: ProductFiltersProps) {
  return (
    <div className="space-y-8">
      {/* Mobile Drawer Header */}
      {isMobileDrawer && (
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Filters
            </h3>
          </div>
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 1. Category Radio / Selection Group */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">
          Category
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <label
                key={cat.value}
                className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer select-none transition-all ${
                  isSelected
                    ? "bg-white/10 text-white font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="category-filter"
                    value={cat.value}
                    checked={isSelected}
                    onChange={() => onSelectCategory(cat.value)}
                    className="w-4 h-4 accent-orange-500 bg-black/40 border-white/20 focus:ring-0"
                  />
                  <span className="text-xs">{cat.label}</span>
                </div>
                {cat.count !== undefined && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-500 font-mono">
                    {cat.count}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Fabric / Style Checkbox Filter Group */}
      <div className="space-y-3 pt-4 border-t border-white/5">
        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">
          Fabric & Texture
        </h4>
        <div className="space-y-1.5">
          {fabricTypes.map((fabric) => {
            const isChecked = selectedFabrics.includes(fabric.value);
            return (
              <label
                key={fabric.value}
                className="flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer select-none text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleFabric(fabric.value)}
                    className="w-4 h-4 rounded bg-black/40 border border-white/20 accent-orange-500 focus:ring-0"
                  />
                  <span className={`text-xs ${isChecked ? "text-white font-bold" : "font-medium"}`}>
                    {fabric.label}
                  </span>
                </div>
                {fabric.count !== undefined && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-500 font-mono">
                    {fabric.count}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-white/5">
        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">
          Price Range
        </h4>
        <PriceRangeSlider
          minLimit={minPrice}
          maxLimit={maxPrice}
          currentMin={currentMinPrice}
          currentMax={currentMaxPrice}
          onChange={onPriceChange}
        />
      </div>

      {/* Reset Filters CTA */}
      <div className="pt-4 border-t border-white/5">
        <button
          type="button"
          onClick={onResetFilters}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All Filters
        </button>
      </div>
    </div>
  );
}
