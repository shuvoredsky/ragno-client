import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

export interface ShopProduct {
  _id?: string;
  name: string;
  slug: string;
  price: number;
  mrpPrice?: number;
  thumbnailImage: string;
  categorySlug?: string;
  fabric?: string;
  isSale?: boolean;
}

interface ProductGridProps {
  products: ShopProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center bg-zinc-950/40 border border-white/5 rounded-3xl p-8">
        <h3 className="text-base font-bold text-white">No products found</h3>
        <p className="text-xs text-zinc-400 mt-1.5 max-w-sm">
          No products matched your selected filters. Try clearing or adjusting your filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product, idx) => {
        const hasDiscount = product.mrpPrice && product.mrpPrice > product.price;

        return (
          <Link
            key={product._id || product.slug || idx}
            href={`/products/${product.slug}`}
            className="group block relative w-full rounded-2xl overflow-hidden bg-zinc-950/60 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col shadow-lg"
          >
            {/* Product Image Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
              <Image
                src={product.thumbnailImage}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Subtle Dark Gradient Overlay at Bottom */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"
                aria-hidden="true"
              />

              {/* Top-Left SALE Badge */}
              {hasDiscount && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-white bg-orange-600 px-2.5 py-0.5 rounded-full shadow-md">
                    SALE
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Info Bar */}
            <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-zinc-950/90 border-t border-white/5 space-y-2">
              {/* Product Title */}
              <h4 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white transition-colors line-clamp-2 leading-tight">
                {product.name}
              </h4>

              {/* Price Details */}
              <div className="flex items-center gap-2 pt-1">
                <span className={`text-xs sm:text-sm font-black ${hasDiscount ? "text-orange-500" : "text-white"}`}>
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-[11px] text-zinc-500 line-through font-medium">
                    {formatPrice(product.mrpPrice)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
