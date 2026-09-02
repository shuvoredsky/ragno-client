"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { useUiStore } from "@/store/ui-store";

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useUiStore();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  if (!isSearchOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      closeSearch();
      setSearchTerm("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={closeSearch}
        aria-hidden="true"
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-24 pb-12">
        <div className="inline-block w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-[#10080d] border border-white/10 shadow-2xl rounded-3xl z-10 animate-in zoom-in-95 duration-200">
          
          {/* Search Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
              Search Products
            </h3>
            <button
              type="button"
              onClick={closeSearch}
              className="p-1 text-zinc-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-6 relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search shirts, linen, floral, full-sleeve..."
                autoFocus
                className="w-full bg-black/50 border border-white/15 focus:border-white rounded-2xl pl-12 pr-12 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  type="submit"
                  className="absolute right-3 p-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Popular Search Suggestions */}
          <div className="mt-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2.5">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {["Full Sleeve", "Check Shirt", "Linen", "Floral", "Formal", "Black Shirt"].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      router.push(`/products?search=${encodeURIComponent(term)}`);
                      closeSearch();
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/5 transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
