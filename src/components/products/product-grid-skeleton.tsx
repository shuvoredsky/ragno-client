export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl overflow-hidden bg-zinc-950/60 border border-white/5 animate-pulse flex flex-col"
        >
          {/* Image skeleton */}
          <div className="aspect-[3/4] w-full bg-zinc-900/80" />

          {/* Info bar skeleton */}
          <div className="p-3.5 sm:p-4 flex items-start justify-between gap-3 bg-zinc-950/90 border-t border-white/5">
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-zinc-800 rounded w-4/5" />
              <div className="h-3 bg-zinc-900 rounded w-2/3" />
            </div>
            <div className="h-4 bg-zinc-800 rounded w-14 shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}
