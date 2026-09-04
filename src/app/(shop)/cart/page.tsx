"use client";

import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchModal } from "@/components/layout/search-modal";
import { CartItemRow, CartSummary, EmptyCart } from "@/components/cart";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items, getTotalItems, clearCart } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white selection:bg-rose-600 selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar text="FREE SHIPPING ON ORDERS OVER ৳5000" />

      {/* 2. Global Navbar */}
      <Navbar brandName="Ragno" />

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-14 max-w-6xl">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-8 sm:space-y-10">
            {/* Header with Navigation & Clear Cart */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>CONTINUE SHOPPING</span>
                </Link>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-normal text-white tracking-tight">
                  Shopping Cart{" "}
                  <span className="text-lg sm:text-xl font-sans font-semibold text-zinc-400 not-italic ml-2">
                    ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                </h1>
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-rose-400 transition-colors self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Cart Items (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                {items.map((item, idx) => (
                  <CartItemRow
                    key={`${item.product._id}-${item.inventory?._id || idx}`}
                    item={item}
                  />
                ))}
              </div>

              {/* Right Column: Sticky Summary (5 cols) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <CartSummary />
              </div>
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
