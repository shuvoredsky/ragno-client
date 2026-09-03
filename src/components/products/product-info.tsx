import Link from "next/link";
import { formatPrice, calculateDiscount } from "@/lib/utils";

interface ProductInfoProps {
  categoryName: string;
  categorySlug: string;
  name: string;
  price: number;
  mrpPrice?: number;
  sku: string;
  availableQuantity: number;
}

export function ProductInfo({
  categoryName,
  categorySlug,
  name,
  price,
  mrpPrice,
  sku,
  availableQuantity,
}: ProductInfoProps) {
  const discount = mrpPrice ? calculateDiscount(mrpPrice, price) : 0;
  const isOutOfStock = availableQuantity <= 0;
  const isLowStock = availableQuantity > 0 && availableQuantity <= 3;

  return (
    <div className="space-y-4">
      {/* Category / Collection Tag */}
      <div>
        <Link
          href={`/products?category=${categorySlug}`}
          className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
        >
          {categoryName}
        </Link>
      </div>

      {/* Big Serif Italic Product Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-normal tracking-wide text-white leading-[1.15] drop-shadow-sm">
        {name}
      </h1>

      {/* Price Row with Discount Badge */}
      <div className="flex items-center gap-3 pt-1">
        <span className="text-2xl sm:text-3xl font-bold text-orange-500">
          {formatPrice(price)}
        </span>

        {mrpPrice && mrpPrice > price && (
          <span className="text-sm font-medium text-zinc-500 line-through">
            {formatPrice(mrpPrice)}
          </span>
        )}

        {discount > 0 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-wide">
            {discount}% off
          </span>
        )}
      </div>

      {/* SKU */}
      {sku && (
        <div className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
          {sku}
        </div>
      )}

      {/* Stock Availability Indicator */}
      <div className="flex items-center gap-2 pt-1 text-xs font-semibold">
        <span
          className={`w-2 h-2 rounded-full inline-block ${
            isOutOfStock
              ? "bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.8)]"
              : isLowStock
              ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          }`}
        />
        <span
          className={
            isOutOfStock
              ? "text-rose-400 font-bold"
              : isLowStock
              ? "text-amber-300 font-bold"
              : "text-zinc-300"
          }
        >
          {isOutOfStock
            ? "Out of stock"
            : `${availableQuantity} available`}
        </span>
      </div>
    </div>
  );
}
