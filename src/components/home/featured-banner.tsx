import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface FeaturedBannerProps {
  subtitle?: string;
  headline?: string;
  badgeText?: string;
  productName?: string;
  productPrice?: number;
  productHref?: string;
  imageUrl?: string;
}

export function FeaturedBanner({
  subtitle = "Unapologetic Style",
  headline = "PREMIUM QUALITY.",
  badgeText = "BEST SELLER THIS MONTH",
  productName = "PREMIUM FULL SLEEVE FLORAL SHIRT",
  productPrice = 650,
  productHref = "/products/premium-full-sleeve-floral-shirt",
  imageUrl = "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1600&auto=format&fit=crop",
}: FeaturedBannerProps) {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          {subtitle && (
            <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-zinc-400 mb-1">
              {subtitle}
            </p>
          )}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-md">
            {headline}
          </h2>
        </div>

        {/* Featured Showcase Card with Frame Bezel */}
        <div className="w-full max-w-5xl mt-8 sm:mt-12">
          <Link
            href={productHref}
            className="block group relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] hover:border-white/25 transition-all duration-500 overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900">
              <Image
                src={imageUrl}
                alt={productName}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Darkness Overlays */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" 
                aria-hidden="true"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" 
                aria-hidden="true"
              />

              {/* Top-Left Badge */}
              {badgeText && (
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span className="inline-flex items-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/40 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 animate-pulse" />
                    {badgeText}
                  </span>
                </div>
              )}

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white group-hover:text-rose-200 transition-colors drop-shadow-md">
                  {productName}
                </h3>
                <p className="text-sm sm:text-base font-bold text-zinc-300 mt-1">
                  {formatPrice(productPrice)}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
