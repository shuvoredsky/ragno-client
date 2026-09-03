"use client";

import { Check, ChevronRight } from "lucide-react";

interface CheckoutStepperProps {
  currentStep: 1 | 2 | 3;
  onStepClick?: (step: 1 | 2 | 3) => void;
}

export function CheckoutStepper({
  currentStep,
  onStepClick,
}: CheckoutStepperProps) {
  const steps: Array<{ step: 1 | 2 | 3; label: string }> = [
    { step: 1, label: "Address" },
    { step: 2, label: "Shipping" },
    { step: 3, label: "Payment" },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-2">
      {steps.map((item, idx) => {
        const isCompleted = item.step < currentStep;
        const isActive = item.step === currentStep;

        return (
          <div key={item.step} className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              type="button"
              disabled={item.step > currentStep}
              onClick={() => onStepClick && item.step < currentStep && onStepClick(item.step)}
              className={`flex items-center gap-2 text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? "text-white cursor-default"
                  : isCompleted
                  ? "text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  : "text-zinc-500 cursor-not-allowed"
              }`}
            >
              {/* Circular Badge */}
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  isCompleted
                    ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)] border border-emerald-300"
                    : isActive
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/40 scale-105"
                    : "bg-zinc-800/80 border border-white/10 text-zinc-500"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : item.step}
              </div>

              <span>{item.label}</span>
            </button>

            {/* Separator Chevron */}
            {idx < steps.length - 1 && (
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}
