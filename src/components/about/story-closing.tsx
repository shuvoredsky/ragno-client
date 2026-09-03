export interface StoryClosingProps {
  heading?: string;
  quote?: string;
  points?: string[];
}

export function StoryClosing({
  heading = "শেষ কথা",
  quote = "আমরা যখন নিজের কাজকে বিশ্বাস করি, প্রতিটি সৃষ্টিতেই সেই আস্থার প্রতিফলন ঘটে।",
  points = [
    "আপসহীন ফেব্রিক নির্বাচন ও আধুনিক নিখুঁত সেলাই",
    "ন্যায্য মূল্যে সবার জন্য প্রিমিয়াম লাইফস্টাইল তৈরি করা",
    "উপজেলা থেকে সারা বাংলাদেশ — প্রতিটি দোরগোড়ায় বিশ্বস্ত সেবা",
  ],
}: StoryClosingProps) {
  return (
    <section className="py-12 sm:py-16 space-y-6 sm:space-y-8 border-t border-white/10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white">
        {heading}
      </h2>

      <div className="space-y-4 max-w-4xl">
        <p className="text-sm sm:text-base font-bold text-amber-400 italic leading-relaxed">
          {quote}
        </p>

        <ul className="space-y-3 pt-2 text-xs sm:text-sm text-zinc-300">
          {points.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <span className="leading-relaxed">{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
