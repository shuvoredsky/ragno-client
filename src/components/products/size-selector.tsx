"use client";

import { ProductSizeOption } from "./mock-products";

interface SizeSelectorProps {
  sizeOptions: ProductSizeOption[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export function SizeSelector({
  sizeOptions,
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      {/* Label Row */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-zinc-300">
          Size
        </span>
        {selectedSize && (
          <span className="text-zinc-400 font-medium">
            {selectedSize} selected
          </span>
        )}
      </div>

      {/* Sizes Buttons */}
      <div className="flex flex-wrap gap-2.5">
        {sizeOptions.map((opt) => {
          const isSelected = opt.size === selectedSize;
          const isOutOfStock = opt.availableQuantity <= 0;

          return (
            <button
              key={opt.size}
              type="button"
              disabled={isOutOfStock}
              onClick={() => onSelectSize(opt.size)}
              className={`min-w-[48px] h-10 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center border ${
                isSelected
                  ? "bg-white text-black border-white shadow-md scale-102"
                  : isOutOfStock
                  ? "bg-black/30 border-white/5 text-zinc-600 line-through cursor-not-allowed opacity-50"
                  : "bg-zinc-900/90 border-white/15 text-zinc-300 hover:text-white hover:border-white/40 active:scale-95"
              }`}
            >
              {opt.size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
