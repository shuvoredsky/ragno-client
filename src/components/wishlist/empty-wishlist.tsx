import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export function EmptyWishlist() {
  return (
    <div className="py-16 sm:py-24 text-center flex flex-col items-center justify-center max-w-lg mx-auto rounded-3xl bg-zinc-950/40 border border-white/5 p-8 sm:p-12 backdrop-blur-sm shadow-2xl">
      {/* Halo Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-rose-900/40 blur-2xl rounded-full" />
        <div className="relative w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-rose-500">
          <Heart className="w-10 h-10 stroke-rose-500" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
        Your Wishlist is Empty
      </h2>

      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8 max-w-sm">
        Save your favorite styles by tapping the heart icon on any product to easily find and purchase them later.
      </p>

      <Link
        href="/products"
        className="py-3.5 px-8 rounded-full bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl hover:scale-105 active:scale-95 group"
      >
        <span>EXPLORE COLLECTIONS</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
