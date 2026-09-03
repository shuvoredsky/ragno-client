"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout-store";
import { updateIncompleteOrderAction } from "@/lib/actions/order-actions";

export function ShippingStepForm() {
  const { shipping, setShipping, nextStep, prevStep, incompleteOrderId } =
    useCheckoutStore();

  const [agreed, setAgreed] = useState(shipping.agreedToTerms ?? true);
  const [selectedMethodId, setSelectedMethodId] = useState(
    shipping.methodId || "steadfast"
  );
  const [error, setError] = useState<string | null>(null);

  const shippingMethods = [
    {
      id: "steadfast",
      name: "Steadfast Courier",
      description: "Home delivery nationwide",
      rate: 115,
    },
  ];

  const handleContinue = async () => {
    if (!agreed) {
      setError("Please agree to our Terms of Service & Policies to continue.");
      return;
    }

    const currentMethod =
      shippingMethods.find((m) => m.id === selectedMethodId) || shippingMethods[0];

    setShipping({
      methodId: currentMethod.id,
      methodName: currentMethod.name,
      description: currentMethod.description,
      rate: currentMethod.rate,
      agreedToTerms: agreed,
    });

    // Optionally sync updated shipping cost with backend incomplete order
    if (incompleteOrderId) {
      updateIncompleteOrderAction(incompleteOrderId, {
        shippingCost: currentMethod.rate,
      });
    }

    nextStep();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        Shipping Method
      </h2>

      {/* Selectable Shipping Method Card */}
      <div className="space-y-3">
        {shippingMethods.map((method) => {
          const isSelected = selectedMethodId === method.id;

          return (
            <div
              key={method.id}
              onClick={() => setSelectedMethodId(method.id)}
              className={`relative rounded-2xl p-4 sm:p-5 cursor-pointer transition-all border ${
                isSelected
                  ? "bg-zinc-950/80 border-teal-500/80 shadow-[0_0_18px_rgba(20,184,166,0.25)]"
                  : "bg-zinc-950/40 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {method.name}
                  </h4>
                  <p className="text-xs text-zinc-400 font-medium">
                    {method.description}
                  </p>
                  <div className="text-xs sm:text-sm font-bold text-teal-400 pt-1">
                    BDT {method.rate}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terms and Privacy Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            onClick={() => {
              setAgreed(!agreed);
              if (error) setError(null);
            }}
            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              agreed
                ? "bg-teal-500 border-teal-400 text-black shadow-[0_0_10px_rgba(20,184,166,0.4)]"
                : "bg-zinc-900 border-white/20 hover:border-white/40"
            }`}
          >
            {agreed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>

          <span className="text-xs text-zinc-300 leading-relaxed select-none">
            By placing this order, you agree to our{" "}
            <Link
              href="/terms-condition"
              className="text-teal-400 underline hover:text-teal-300 font-medium"
            >
              Terms of Service
            </Link>
            ,{" "}
            <Link
              href="/privacy-policy"
              className="text-teal-400 underline hover:text-teal-300 font-medium"
            >
              Privacy Policy
            </Link>
            , and{" "}
            <Link
              href="/return-policy"
              className="text-teal-400 underline hover:text-teal-300 font-medium"
            >
              Return Policy
            </Link>
            .
          </span>
        </label>

        {error && (
          <p className="text-[11px] text-rose-400 font-medium mt-2">{error}</p>
        )}
      </div>

      {/* Back and Continue Buttons */}
      <div className="flex items-center gap-3 pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="py-3 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
        >
          BACK
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="py-3 px-8 rounded-xl bg-gradient-to-r from-purple-950/60 via-zinc-900 to-teal-950/60 hover:from-purple-900/70 hover:to-teal-900/70 border border-teal-500/50 hover:border-teal-400 text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] active:scale-95"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
