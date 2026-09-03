import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ShopProduct } from "./mock-products";

interface RelatedProductsProps {
  products: ShopProduct[];
  title?: string;
}

export function RelatedProducts({
  products,
  title = "You may also like",
}: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="pt-12 sm:pt-16 pb-8 border-t border-white/10">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-normal tracking-wide text-white drop-shadow-sm mb-8">
        {title}
      </h2>

      {/* 4-Column Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, idx) => {
          const hasDiscount = product.mrpPrice && product.mrpPrice > product.price;

          return (
            <Link
              key={product._id || product.slug || idx}
              href={`/products/${product.slug}`}
              className="group block relative rounded-2xl overflow-hidden bg-zinc-950/60 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col shadow-lg"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={product.thumbnailImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Top-Left SALE Badge */}
                {hasDiscount && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-white bg-black/90 px-2.5 py-0.5 rounded-sm shadow-md border border-white/10">
                      SALE
                    </span>
                  </div>
                )}

                {/* Bottom OUT OF STOCK Overlay Bar (as in reference screenshot) */}
                {product.isOutOfStock && (
                  <div className="absolute bottom-0 inset-x-0 bg-black/85 backdrop-blur-xs py-1.5 text-center border-t border-white/10 z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Content Bar */}
              <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-zinc-950/90 border-t border-white/5 space-y-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white transition-colors line-clamp-1 leading-tight">
                  {product.name}
                </h4>

                <div className="flex items-center gap-2 pt-0.5">
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
    </section>
  );
}
