"use client";

import Link from "next/link";
import { ArrowLeft, Trash2, Heart } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchModal } from "@/components/layout/search-modal";
import { WishlistItemCard, EmptyWishlist } from "@/components/wishlist";
import { useWishlistStore } from "@/store/wishlist-store";

export default function WishlistPage() {
  const { items, clearWishlist, getTotalItems } = useWishlistStore();
  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white selection:bg-rose-600 selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar text="FREE SHIPPING ON ORDERS OVER ৳5000" />

      {/* 2. Global Navbar */}
      <Navbar brandName="Ragno" />

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-14 max-w-7xl">
        {items.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="space-y-8 sm:space-y-10">
            {/* Header with Navigation & Clear Action */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>CONTINUE SHOPPING</span>
                </Link>
                <div className="flex items-center gap-3">
                  <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-rose-500 text-rose-500" />
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-normal text-white tracking-tight">
                    My Wishlist{" "}
                    <span className="text-lg sm:text-xl font-sans font-semibold text-zinc-400 not-italic ml-2">
                      ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                  </h1>
                </div>
              </div>

              <button
                type="button"
                onClick={clearWishlist}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-rose-400 transition-colors self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {items.map((product) => (
                <WishlistItemCard
                  key={product._id || product.slug}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer brandName="Ragno" />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
