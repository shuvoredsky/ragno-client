"use client";

import Image from "next/image";

interface StoryHeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  backgroundImageUrl?: string;
}

export function StoryHero({
  title = "আমাদের গল্প",
  subtitle = "THE CRAFT & THE JOURNEY",
  buttonText = "পড়ুন গল্প",
  backgroundImageUrl = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1800&auto=format&fit=crop",
}: StoryHeroProps) {
  const handleScrollToContent = () => {
    const el = document.getElementById("story-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[60vh] min-h-[420px] max-h-[600px] flex items-center justify-center text-center overflow-hidden bg-zinc-950 select-none">
      {/* Background Image with Dark Atmospheric Overlay */}
      <Image
        src={backgroundImageUrl}
        alt="Our Story Backdrop"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-40 scale-105 animate-in fade-in duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090407] via-[#090407]/60 to-transparent" />

      {/* Hero Typography & CTA */}
      <div className="relative z-10 container mx-auto px-4 space-y-4 max-w-3xl">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
          {title}
        </h1>

        <p className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-zinc-300">
          {subtitle}
        </p>

        <div className="pt-3">
          <button
            type="button"
            onClick={handleScrollToContent}
            className="py-3 px-8 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
