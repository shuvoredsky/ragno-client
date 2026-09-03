export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-12 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-zinc-800 rounded w-1/3" />

      {/* Main 2-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Gallery Skeleton */}
        <div className="aspect-[4/5] rounded-3xl bg-zinc-900" />

        {/* Right Info Skeleton */}
        <div className="space-y-6">
          <div className="h-3 bg-zinc-800 rounded w-1/4" />
          <div className="h-8 bg-zinc-800 rounded w-3/4" />
          <div className="h-6 bg-zinc-800 rounded w-1/3" />
          <div className="h-3 bg-zinc-800 rounded w-1/6" />
          <div className="h-10 bg-zinc-900 rounded w-1/2" />
          <div className="h-12 bg-zinc-800 rounded-full w-full" />
        </div>
      </div>
    </div>
  );
}
