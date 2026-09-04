"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { toast } from "sonner";

export function CartSummary() {
  const { getSubtotal } = useCartStore();
  const { couponCode, couponDiscount, setCoupon } = useCheckoutStore();
  const [inputCode, setInputCode] = useState(couponCode || "");
  const [isApplying, setIsApplying] = useState(false);

  const subtotal = getSubtotal();
  const freeShippingThreshold = 5000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 115;
  const grandTotal = Math.max(0, subtotal + shippingCost - couponDiscount);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

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
      {/* 1. Main Summary Card */}
      <div className="rounded-2xl sm:rounded-3xl bg-zinc-950/70 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
        <h3 className="text-xl font-bold text-white tracking-tight">
          Order Summary
        </h3>

        {/* Free Shipping Progress Indicator */}
        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Truck className="w-4 h-4 text-amber-400" />
            <span className={isFreeShipping ? "text-emerald-400" : "text-zinc-300"}>
              {isFreeShipping
                ? "You have qualified for Free Shipping!"
                : `Add ${formatPrice(remainingForFreeShipping)} more to get Free Shipping!`}
            </span>
          </div>

          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              style={{
                width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
              }}
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500 rounded-full"
            />
          </div>
        </div>

        {/* Cost Calculation Rows */}
        <div className="space-y-3 text-xs sm:text-sm divide-y divide-white/5">
          <div className="flex items-center justify-between text-zinc-400 pt-1">
            <span>Subtotal</span>
            <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400 pt-3">
            <span>Shipping Estimate</span>
            <span className="font-semibold text-white">
              {isFreeShipping ? (
                <span className="text-emerald-400 font-bold uppercase">Free</span>
              ) : (
                formatPrice(shippingCost)
              )}
            </span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex items-center justify-between text-emerald-400 pt-3">
              <span>Coupon Discount ({couponCode})</span>
              <span className="font-bold">-{formatPrice(couponDiscount)}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 text-base sm:text-lg">
            <span className="font-black text-white">Estimated Total</span>
            <span className="font-black text-emerald-400 text-xl tracking-tight">
              {formatPrice(grandTotal)}
            </span>
          </div>
        </div>

        {/* Proceed to Checkout CTA */}
        <div className="pt-2">
          <Link
            href="/checkout"
            className="w-full py-4 px-6 rounded-full bg-white hover:bg-zinc-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-[1.02] active:scale-95 group"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Secure 256-bit SSL encrypted checkout</span>
        </div>
      </div>

      {/* 2. Coupon Card */}
      <div className="rounded-2xl sm:rounded-3xl bg-zinc-950/70 border border-white/10 p-5 backdrop-blur-md shadow-xl">
        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
          Have a coupon code?
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
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/40 hover:border-emerald-400 text-xs font-bold text-white transition-all active:scale-95 disabled:opacity-50"
          >
            {isApplying ? "..." : "Apply"}
          </button>
        </form>
      </div>
    </div>
  );
}
