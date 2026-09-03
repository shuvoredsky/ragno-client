"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SortOption {
  label: string;
  value: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { label: "Featured", value: "featured" },
  { label: "Best Selling", value: "bestSell" },
  { label: "Popular", value: "popular" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

interface SortDropdownProps {
  currentSort: string;
  onSortChange: (sortValue: string) => void;
}

export function SortDropdown({ currentSort = "featured", onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    SORT_OPTIONS.find((opt) => opt.value === currentSort) || SORT_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 hidden sm:inline-block">
          Sort by:
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/25 text-xs font-bold text-white transition-colors min-w-[160px] shadow-sm"
        >
          <span>{selectedOption.label}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#11080e] border border-white/10 shadow-2xl p-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left ${
                option.value === currentSort
                  ? "bg-orange-600 text-white font-bold"
                  : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{option.label}</span>
              {option.value === currentSort && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
