"use client";

import { ShoppingBag, Zap, AlertCircle } from "lucide-react";

interface AddToCartActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  isOutOfStock: boolean;
  isLoading?: boolean;
}

export function AddToCartActions({
  onAddToCart,
  onBuyNow,
  isOutOfStock,
  isLoading = false,
}: AddToCartActionsProps) {
  if (isOutOfStock) {
    return (
      <div className="pt-2">
        <button
          type="button"
          disabled
          className="w-full py-4 px-6 rounded-full bg-zinc-900 border border-white/10 text-zinc-500 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <AlertCircle className="w-4 h-4" />
          <span>Out of Stock</span>
        </button>
      </div>
    );
  }

  return (
    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
      {/* Add to Cart Button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={onAddToCart}
        className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-transparent hover:bg-white/5 border border-white/20 hover:border-white text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Add to Cart</span>
      </button>

      {/* Buy Now Button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={onBuyNow}
        className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02] active:scale-95"
      >
        <Zap className="w-4 h-4 text-black fill-current" />
        <span>Buy Now</span>
      </button>
    </div>
  );
}
