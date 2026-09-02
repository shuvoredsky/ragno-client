import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface ProductCardProps {
  product: {
    _id?: string;
    id?: string;
    name: string;
    slug: string;
    price: number;
    mrpPrice?: number;
    thumbnailImage: string;
    isSale?: boolean;
    isNew?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const isSale = product.isSale || (product.mrpPrice && product.mrpPrice > product.price);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block relative w-full rounded-2xl overflow-hidden bg-zinc-950/60 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col shadow-lg"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
        <Image
          src={product.thumbnailImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle Dark Gradient Overlay at Bottom of Image */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" 
          aria-hidden="true"
        />

        {/* Top-Left SALE Badge */}
        {isSale && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-white bg-orange-600 px-2.5 py-0.5 rounded-full shadow-md">
              SALE
            </span>
          </div>
        )}
      </div>

      {/* Bottom Content / Info Bar */}
      <div className="p-3.5 sm:p-4 flex items-start justify-between gap-2 flex-1 bg-zinc-950/90 border-t border-white/5">
        {/* Title */}
        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h4>
        </div>

        {/* Prices */}
        <div className="flex flex-col items-end shrink-0 text-right">
          <span className="text-xs sm:text-sm font-black text-white">
            {formatPrice(product.price)}
          </span>
          {product.mrpPrice && product.mrpPrice > product.price && (
            <span className="text-[11px] text-zinc-500 line-through font-medium">
              {formatPrice(product.mrpPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
