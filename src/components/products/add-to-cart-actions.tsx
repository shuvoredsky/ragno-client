"use client";

import { ShoppingBag, Zap, AlertCircle, Heart } from "lucide-react";

interface AddToCartActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  isOutOfStock: boolean;
  isLoading?: boolean;
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
}

export function AddToCartActions({
  onAddToCart,
  onBuyNow,
  isOutOfStock,
  isLoading = false,
  isWishlisted = false,
  onToggleWishlist,
}: AddToCartActionsProps) {
  if (isOutOfStock) {
    return (
      <div className="pt-2 flex items-center gap-3">
        <button
          type="button"
          disabled
          className="flex-1 py-4 px-6 rounded-full bg-zinc-900 border border-white/10 text-zinc-500 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <AlertCircle className="w-4 h-4" />
          <span>Out of Stock</span>
        </button>

        {onToggleWishlist && (
          <button
            type="button"
            onClick={onToggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="w-12 h-12 rounded-full border border-white/20 hover:border-rose-500 bg-white/5 hover:bg-rose-500/10 flex items-center justify-center text-rose-500 transition-all shrink-0 active:scale-90"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-rose-500 text-rose-500" : "stroke-rose-500"}`} />
          </button>
        )}
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

      {/* Heart Wishlist Toggle Button */}
      {onToggleWishlist && (
        <button
          type="button"
          onClick={onToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="w-12 h-12 rounded-full border border-white/20 hover:border-rose-500 bg-white/5 hover:bg-rose-500/10 flex items-center justify-center text-rose-500 transition-all shrink-0 active:scale-90"
        >
          <Heart className={`w-5 h-5 transition-all ${isWishlisted ? "fill-rose-500 text-rose-500 scale-110" : "stroke-rose-500"}`} />
        </button>
      )}
    </div>
  );
}
