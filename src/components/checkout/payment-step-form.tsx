"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Copy, Check, ChevronDown } from "lucide-react";
import { useCheckoutStore, PaymentOption, PaymentMethod } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { completeOrderAction } from "@/lib/actions/order-actions";
import { formatPrice } from "@/lib/utils";

interface PaymentStepFormProps {
  bkashPersonalNumber?: string;
  nagadPersonalNumber?: string;
}

export function PaymentStepForm({
  bkashPersonalNumber = "01998778632",
  nagadPersonalNumber = "01998778632",
}: PaymentStepFormProps) {
  const router = useRouter();
  const {
    payment,
    setPayment,
    prevStep,
    incompleteOrderId,
    resetCheckout,
    couponDiscount,
    couponCode,
  } = useCheckoutStore();

  const { getSubtotal, clearCart } = useCartStore();

  const [paymentOption, setPaymentOption] = useState<PaymentOption>(
    payment.paymentOption || "delivery_charge"
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    payment.paymentMethod || "bkash"
  );
  const [senderNumber, setSenderNumber] = useState(payment.senderNumber || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const subtotal = getSubtotal() || 800;
  const shippingCost = 115;
  const totalAmount = Math.max(0, subtotal + shippingCost - couponDiscount);
  const dueAmount = subtotal - couponDiscount;

  const currentPaymentNumber =
    paymentMethod === "nagad" ? nagadPersonalNumber : bkashPersonalNumber;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(currentPaymentNumber);
    setHasCopied(true);
    toast.success("Payment number copied to clipboard!");
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate sender number
    const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!senderNumber.trim() || !bdPhoneRegex.test(senderNumber.trim())) {
      setValidationError("অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)");
      return;
    }

    setValidationError(null);
    setIsSubmitting(true);

    // 2. Save payment state
    setPayment({
      paymentOption,
      paymentMethod,
      senderNumber: senderNumber.trim(),
    });

    // 3. Prepare payload for complete order
    const orderIdToComplete =
      incompleteOrderId || `ORD-${Date.now().toString().slice(-6)}`;

    const payload = {
      transactionId: senderNumber.trim(),
      paymentSessionId: `MANUAL-${paymentMethod.toUpperCase()}-${Date.now()}`,
      shippingCost,
      totalPrice: totalAmount,
      customerCity: "Dhaka",
      couponDiscount,
      couponRef: couponCode || null,
    };

    try {
      const res = await completeOrderAction(orderIdToComplete, payload);

      if (res.success) {
        toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
        clearCart();
        resetCheckout();
        router.push(`/order-success/${orderIdToComplete}`);
      } else {
        toast.error(res.message || "Failed to place order. Please try again.");
      }
    } catch (err: any) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        পেমেন্ট
      </h2>

      <form onSubmit={handlePlaceOrder} className="space-y-6">
        {/* 1. পেমেন্ট অপশন * (Radio Cards) */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-zinc-300">
            পেমেন্ট অপশন <span className="text-rose-500">*</span>
          </label>

          {/* Option A: শুধু ডেলিভারি চার্জ পরিশোধ করুন (Default Selected) */}
          <div
            onClick={() => setPaymentOption("delivery_charge")}
            className={`relative rounded-2xl p-4 sm:p-5 cursor-pointer transition-all border ${
              paymentOption === "delivery_charge"
                ? "bg-zinc-950/80 border-teal-500/80 shadow-[0_0_18px_rgba(20,184,166,0.25)]"
                : "bg-zinc-950/40 border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  paymentOption === "delivery_charge"
                    ? "border-pink-500 bg-pink-500/20"
                    : "border-zinc-600 bg-zinc-900"
                }`}
              >
                {paymentOption === "delivery_charge" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  শুধু ডেলিভারি চার্জ পরিশোধ করুন
                </h4>
                <p className="text-[11px] sm:text-xs text-zinc-400 font-medium">
                  এখন <span className="text-white font-bold">{formatPrice(shippingCost)}</span> দিন, বাকি{" "}
                  <span className="text-white font-bold">{formatPrice(dueAmount)}</span> ক্যাশ অন ডেলিভারি (COD)
                </p>
              </div>
            </div>
          </div>

          {/* Option B: সম্পূর্ণ পেমেন্ট অনলাইনে করুন */}
          <div
            onClick={() => setPaymentOption("full_payment")}
            className={`relative rounded-2xl p-4 sm:p-5 cursor-pointer transition-all border ${
              paymentOption === "full_payment"
                ? "bg-zinc-950/80 border-teal-500/80 shadow-[0_0_18px_rgba(20,184,166,0.25)]"
                : "bg-zinc-950/40 border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  paymentOption === "full_payment"
                    ? "border-pink-500 bg-pink-500/20"
                    : "border-zinc-600 bg-zinc-900"
                }`}
              >
                {paymentOption === "full_payment" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  সম্পূর্ণ পেমেন্ট অনলাইনে করুন
                </h4>
                <p className="text-[11px] sm:text-xs text-zinc-400 font-medium">
                  এখন সম্পূর্ণ <span className="text-white font-bold">{formatPrice(totalAmount)}</span> পরিশোধ করুন, ডেলিভারিতে কোনো পেমেন্ট লাগবে না
                </p>
                <div className="text-[11px] text-purple-400 pt-0.5 font-medium">
                  গিফট অর্ডারের জন্য আদর্শ
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. পেমেন্ট পদ্ধতি * (Dropdown) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-zinc-300">
            পেমেন্ট পদ্ধতি <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full appearance-none bg-zinc-900/90 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30 transition-colors pr-10 cursor-pointer"
            >
              <option value="bkash" className="bg-zinc-900 text-white">
                বিকাশ (bKash)
              </option>
              <option value="nagad" className="bg-zinc-900 text-white">
                নগদ (Nagad)
              </option>
              <option value="rocket" className="bg-zinc-900 text-white">
                রকেট (Rocket)
              </option>
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Manual Payment Instructions Box */}
        <div className="rounded-2xl bg-zinc-950/90 border border-white/10 p-4 sm:p-5 space-y-3.5 shadow-xl">
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
            অর্ডারটি কনফার্ম করার জন্য অনুগ্রহ করে নিচের{" "}
            <strong className="text-white font-bold">
              {paymentMethod === "nagad" ? "নগদ" : "বিকাশ"} পার্সোনাল নম্বরে
            </strong>{" "}
            <strong className="text-teal-400 font-bold">
              {formatPrice(paymentOption === "full_payment" ? totalAmount : shippingCost)}
            </strong>{" "}
            {paymentOption === "full_payment" ? "সম্পূর্ণ মূল্য" : "ডেলিভারি চার্জ"} অগ্রিম Send Money করুন।
          </p>

          {/* Personal Number Box with Copy Action */}
          <div className="flex items-center justify-between bg-zinc-900/90 border border-white/10 rounded-xl px-4 py-3">
            <div className="text-xs sm:text-sm font-bold text-white font-mono">
              <span className="text-zinc-400 font-sans font-normal">
                {paymentMethod === "nagad" ? "নগদ" : "বিকাশ"} (Personal):{" "}
              </span>
              {currentPaymentNumber}
            </div>
            <button
              type="button"
              onClick={handleCopyNumber}
              className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-bold transition-colors"
            >
              {hasCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>কপি করুন</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-1 text-xs text-zinc-400 pt-1 border-t border-white/5">
            <div>
              অগ্রিম পরিশোধ:{" "}
              <strong className="text-white font-bold">
                {formatPrice(paymentOption === "full_payment" ? totalAmount : shippingCost)}
              </strong>{" "}
              ({paymentOption === "full_payment" ? "সম্পূর্ণ টাকা" : "ডেলিভারি চার্জ"})
            </div>
            {paymentOption === "delivery_charge" && (
              <div>
                বাকি টাকা:{" "}
                <strong className="text-white font-bold">{formatPrice(dueAmount)}</strong>{" "}
                (ক্যাশ অন ডেলিভারি / COD)
              </div>
            )}
          </div>
        </div>

        {/* 4. Sender Number Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-zinc-300">
            যে নম্বর থেকে টাকা পাঠিয়েছেন <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            value={senderNumber}
            onChange={(e) => {
              setSenderNumber(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="01712345678"
            className={`w-full bg-zinc-900/90 border rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
              validationError
                ? "border-rose-500 focus:border-rose-400"
                : "border-white/10 focus:border-white/30"
            }`}
          />
          <p className="text-[11px] text-zinc-400 font-normal">
            পেমেন্ট সম্পন্ন হলে যে মোবাইল নম্বর থেকে টাকা পাঠিয়েছেন, সেই নম্বরটি সঠিকভাবে লিখুন।
          </p>
          {validationError && (
            <p className="text-[11px] text-rose-400 font-medium">
              {validationError}
            </p>
          )}
        </div>

        {/* Action Buttons: BACK & PLACE ORDER */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={prevStep}
            disabled={isSubmitting}
            className="py-3.5 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
          >
            BACK
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3.5 px-8 rounded-xl bg-gradient-to-r from-purple-950/60 via-zinc-900 to-teal-950/60 hover:from-purple-900/70 hover:to-teal-900/70 border border-teal-500/50 hover:border-teal-400 text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? "PLACING ORDER..." : "PLACE ORDER"}
          </button>
        </div>
      </form>
    </div>
  );
}
