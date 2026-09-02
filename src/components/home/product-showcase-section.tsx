"use client";

import { useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "./product-card";

interface ShowcaseProduct {
  _id?: string;
  name: string;
  slug: string;
  price: number;
  mrpPrice?: number;
  thumbnailImage: string;
  isSale?: boolean;
}

interface ProductShowcaseSectionProps {
  title: string;
  description?: string;
  collectionHref?: string;
  collectionLabel?: string;
  products: ShowcaseProduct[];
}

export function ProductShowcaseSection({
  title,
  description,
  collectionHref = "/products",
  collectionLabel = "Shop Collection",
  products,
}: ProductShowcaseSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-12 sm:py-16 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Sidebar Column (Title & Nav Arrows) */}
          <div className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col justify-between self-stretch">
            <div>
              {/* Big Bold Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[1.05] drop-shadow-sm">
                {title}
              </h2>

              {/* Description line if provided */}
              {description && (
                <p className="mt-3 text-xs sm:text-sm font-medium text-zinc-400 max-w-xs leading-relaxed">
                  {description}
                </p>
              )}

              {/* Shop Collection Link */}
              <div className="mt-4">
                <Link
                  href={collectionHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white group transition-colors"
                >
                  <span className="underline underline-offset-4">{collectionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Circular Carousel Controls (< and >) */}
            <div className="flex items-center gap-2.5 mt-6 lg:mt-12">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous products"
                className="w-10 h-10 rounded-full bg-zinc-950 border border-white/20 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90 shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next products"
                className="w-10 h-10 rounded-full bg-zinc-950 border border-white/20 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90 shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Product Cards Carousel Container */}
          <div className="flex-1 w-full min-w-0 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 sm:gap-6">
              {products.map((product, idx) => (
                <div
                  key={product._id || product.slug || idx}
                  className="shrink-0 w-[240px] sm:w-[260px] md:w-[280px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
