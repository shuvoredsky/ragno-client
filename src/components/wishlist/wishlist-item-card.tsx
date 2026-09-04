"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

interface WishlistItemCardProps {
  product: Product;
}

export function WishlistItemCard({ product }: WishlistItemCardProps) {
  const { toggleItem } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const { user } = useAuthStore();

  const productSlug = product.slug || product._id;
  const hasDiscount = product.mrpPrice && product.mrpPrice > product.price;

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleItem(product, user?.id || user?._id);
    toast.info(`Removed ${product.name} from wishlist`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`Added ${product.name} to cart`);
    openCart();
  };

  return (
    <div className="group relative w-full rounded-2xl overflow-hidden bg-zinc-950/70 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col shadow-xl">
      {/* Thumbnail Container */}
      <Link
        href={`/products/${productSlug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 block"
      >
        <Image
          src={product.thumbnailImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {/* SALE Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-white bg-orange-600 px-2.5 py-0.5 rounded-full shadow-md">
              SALE
            </span>
          </div>
        )}
      </Link>

      {/* Remove from Wishlist Button (Filled Red Heart) */}
      <button
        type="button"
        onClick={handleRemove}
        aria-label="Remove from wishlist"
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black backdrop-blur-md border border-white/15 flex items-center justify-center text-rose-500 hover:scale-110 active:scale-95 transition-all shadow-md"
      >
        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
      </button>

      {/* Details & Quick Add CTA */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-zinc-950/90 border-t border-white/5 space-y-3">
        <div>
          <Link
            href={`/products/${productSlug}`}
            className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white transition-colors line-clamp-2 leading-tight"
          >
            {product.name}
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2 pt-1.5">
            <span
              className={`text-xs sm:text-sm font-black ${
                hasDiscount ? "text-orange-500" : "text-white"
              }`}
            >
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-zinc-500 line-through font-medium">
                {formatPrice(product.mrpPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add To Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white text-zinc-200 hover:text-black border border-white/15 hover:border-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
