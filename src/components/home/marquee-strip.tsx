interface MarqueeStripProps {
  items?: string[];
}

const defaultMarqueeItems = [
  "NEW ARRIVALS",
  "FREE SHIPPING OVER ৳5,000",
  "PREMIUM QUALITY",
  "MADE WITH PURPOSE",
  "SHOP NOW",
  "FAST NATIONWIDE DELIVERY",
  "100% ORGANIC COTTON",
];

export function MarqueeStrip({
  items = defaultMarqueeItems,
}: MarqueeStripProps) {
  // Duplicate array for infinite seamless looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-black/80 border-y border-white/10 py-3 sm:py-3.5 overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {repeatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center text-[10px] sm:text-xs font-black tracking-widest uppercase text-zinc-300 mx-4 sm:mx-6"
          >
            <span>{item}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-600/70 ml-4 sm:ml-6" />
          </div>
        ))}
      </div>
    </div>
  );
}
