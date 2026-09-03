"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { toast } from "sonner";

interface OrderSummaryCardProps {
  shippingCost?: number;
}

export function OrderSummaryCard({ shippingCost = 115 }: OrderSummaryCardProps) {
  const { items, getSubtotal } = useCartStore();
  const { couponCode, couponDiscount, setCoupon } = useCheckoutStore();
  const [inputCode, setInputCode] = useState(couponCode || "");
  const [isApplying, setIsApplying] = useState(false);

  const subtotal = getSubtotal();
  const total = Math.max(0, subtotal + shippingCost - couponDiscount);

  // Fallback demo item if cart is empty for testing UI
  const displayItems =
    items.length > 0
      ? items
      : [
          {
            product: {
              _id: "demo-item-1",
              name: "Grey & White Striped Boxy Fit Shirt",
              price: 800,
              thumbnailImage:
                "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=600&auto=format&fit=crop",
            } as any,
            quantity: 1,
            inventory: {
              _id: "inv-1",
              size: "XL",
            } as any,
          },
        ];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      toast.error("Please enter a valid coupon code");
      return;
    }

    setIsApplying(true);
    setTimeout(() => {
      if (inputCode.trim().toUpperCase() === "SUMMER20" || inputCode.trim().toUpperCase() === "RAGNO10") {
        const discount = Math.round(subtotal * 0.1);
        setCoupon(inputCode.trim().toUpperCase(), discount);
        toast.success(`Coupon ${inputCode.toUpperCase()} applied! Discount: ${formatPrice(discount)}`);
      } else {
        toast.error("Invalid or expired coupon code");
      }
      setIsApplying(false);
    }, 400);
  };

  return (
    <div className="w-full space-y-4">
      {/* 1. Main Order Summary Card */}
      <div className="rounded-2xl sm:rounded-3xl bg-zinc-950/70 border border-white/10 p-5 sm:p-6 backdrop-blur-md shadow-2xl space-y-6">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Order Summary
        </h3>

        {/* Product List */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-1 divide-y divide-white/5">
          {displayItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3.5 pt-3 first:pt-0">
              <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                <Image
                  src={item.product.thumbnailImage}
                  alt={item.product.name}
                  fill
                  sizes="60px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {item.product.name}
                </h4>
                <div className="text-[11px] text-zinc-400 font-medium mt-0.5">
                  {item.inventory?.size ? `${item.inventory.size}` : "Free Size"}
                </div>
                <div className="text-[11px] text-zinc-500 font-medium">
                  Qty: {item.quantity}
                </div>
              </div>

              <div className="text-xs sm:text-sm font-bold text-white shrink-0">
                {formatPrice(item.product.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Calculation Rows */}
        <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs sm:text-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Subtotal</span>
            <span className="font-semibold text-white">{formatPrice(subtotal || 800)}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400">
            <span>Shipping</span>
            <span className="font-semibold text-white">{formatPrice(shippingCost)}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400">
            <span>Tax</span>
            <span className="font-semibold text-white">৳0.00</span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex items-center justify-between text-emerald-400">
              <span>Coupon Discount ({couponCode})</span>
              <span className="font-bold">-{formatPrice(couponDiscount)}</span>
            </div>
          )}

          {/* Grand Total */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-base sm:text-lg">
            <span className="font-black text-white">Total</span>
            <span className="font-black text-emerald-400 text-lg sm:text-xl tracking-tight">
              {formatPrice(total || 915)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Coupon Code Input Card */}
      <div className="rounded-2xl sm:rounded-3xl bg-zinc-950/70 border border-white/10 p-4 sm:p-5 backdrop-blur-md shadow-xl">
        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
          Coupon code
        </label>
        <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="SUMMER20"
            className="flex-1 bg-zinc-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
          />
          <button
            type="submit"
            disabled={isApplying}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/40 hover:border-emerald-400 text-xs font-bold text-white transition-all shadow-[0_0_12px_rgba(16,185,129,0.15)] active:scale-95 disabled:opacity-50"
          >
            {isApplying ? "..." : "Apply"}
          </button>
        </form>
      </div>
    </div>
  );
}
