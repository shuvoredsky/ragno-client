"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface ProductAccordionProps {
  description: string;
  detailsAndCare?: string[];
  shippingAndReturns?: string;
}

export function ProductAccordion({
  description,
  detailsAndCare,
  shippingAndReturns,
}: ProductAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(["description"]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const items: AccordionItem[] = [
    {
      id: "description",
      title: "Description",
      content: (
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          {description}
        </p>
      ),
    },
    {
      id: "details",
      title: "Details & care",
      content: (
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-zinc-300">
          {detailsAndCare?.map((item, idx) => (
            <li key={idx}>{item}</li>
          )) || <li>100% Combed Premium Cotton. Hand wash cold.</li>}
        </ul>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & returns",
      content: (
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
          {shippingAndReturns ||
            "Standard delivery in Dhaka within 24-48 hours. Nationwide delivery across Bangladesh in 3-5 business days. 7-day hassle-free exchange policy."}
        </p>
      ),
    },
  ];

  return (
    <div className="w-full border-t border-white/10 divide-y divide-white/10">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div key={item.id} className="py-4 sm:py-5">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between text-left group"
            >
              <span className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-300 transition-colors">
                {item.title}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="pt-3.5 animate-in fade-in slide-in-from-top-1 duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
