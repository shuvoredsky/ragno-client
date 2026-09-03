import Image from "next/image";

export interface StorySectionProps {
  heading: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
  layout?: "image-right" | "image-left";
}

export function StorySection({
  heading,
  paragraphs,
  imageUrl,
  imageAlt,
  layout = "image-right",
}: StorySectionProps) {
  const isImageRight = layout === "image-right";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center py-10 sm:py-14 border-b border-white/5 last:border-b-0">
      {/* Text Column */}
      <div
        className={`lg:col-span-7 space-y-4 sm:space-y-6 ${
          isImageRight ? "order-1" : "order-1 lg:order-2"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight">
          {heading}
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          {paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>

      {/* Image Column */}
      <div
        className={`lg:col-span-5 ${
          isImageRight ? "order-2" : "order-2 lg:order-1"
        }`}
      >
        <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl group">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>
    </div>
  );
}
