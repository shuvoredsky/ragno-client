import Link from "next/link";

interface HeroSectionProps {
  brandTitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  tagline?: string;
}

export function HeroSection({
  brandTitle = "RAGNO",
  primaryButtonText = "Shop Premium",
  primaryButtonHref = "/products?category=premium",
  secondaryButtonText = "Shop Basic",
  secondaryButtonHref = "/products?category=basic",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-16 pb-16 sm:pb-24 flex flex-col items-center justify-center text-center">
      {/* Ambient background wine/maroon glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] h-[350px] bg-rose-950/35 blur-[120px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Massive Brand Gradient Headline */}
        <div className="w-full select-none transform hover:scale-[1.01] transition-transform duration-500">
          <h1 className="font-black uppercase tracking-tighter leading-none text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] drop-shadow-2xl bg-gradient-to-b from-[#ffffff] via-[#df6a8d] to-[#420917] bg-clip-text text-transparent">
            {brandTitle}
          </h1>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4 z-10">
          <Link
            href={primaryButtonHref}
            className="inline-flex items-center justify-center rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-9 py-3 sm:py-3.5 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
          >
            {primaryButtonText}
          </Link>

          <Link
            href={secondaryButtonHref}
            className="inline-flex items-center justify-center rounded-full bg-black/40 hover:bg-white/10 border border-white/20 hover:border-white/50 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 sm:px-9 py-3 sm:py-3.5 transition-all duration-300 active:scale-95 backdrop-blur-sm"
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
