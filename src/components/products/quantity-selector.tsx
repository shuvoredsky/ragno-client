"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onChange: (quantity: number) => void;
}

export function QuantitySelector({
  quantity,
  maxQuantity,
  onChange,
}: QuantitySelectorProps) {
  const isMin = quantity <= 1;
  const isMax = quantity >= maxQuantity;
  const isOutOfStock = maxQuantity <= 0;

  return (
    <div className="space-y-3">
      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
        Quantity
      </span>

      <div className="inline-flex items-center rounded-xl bg-zinc-900/90 border border-white/15 p-1">
        <button
          type="button"
          disabled={isMin || isOutOfStock}
          onClick={() => onChange(Math.max(1, quantity - 1))}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="w-12 text-center text-xs font-bold text-white select-none">
          {isOutOfStock ? 0 : quantity}
        </span>

        <button
          type="button"
          disabled={isMax || isOutOfStock}
          onClick={() => onChange(Math.min(maxQuantity, quantity + 1))}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
