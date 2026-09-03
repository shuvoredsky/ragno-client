"use client";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  loadedProductsCount: number;
  onPageChange: (page: number) => void;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export function PaginationControl({
  currentPage,
  totalPages,
  totalProducts,
  loadedProductsCount,
  onPageChange,
  onLoadMore,
  isLoadingMore = false,
}: PaginationControlProps) {
  const hasMore = currentPage < totalPages;

  return (
    <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
      {/* Product count indicator */}
      <p className="text-xs font-semibold text-zinc-400 tracking-wide">
        You have viewed {loadedProductsCount} of {totalProducts} products
      </p>

      {/* "More products" Load More Button */}
      {hasMore && onLoadMore && (
        <div>
          <button
            type="button"
            disabled={isLoadingMore}
            onClick={onLoadMore}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 transition-all duration-300 shadow-[0_0_25px_rgba(234,88,12,0.3)] hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Loading Products...</span>
              </>
            ) : (
              <span>More products</span>
            )}
          </button>
        </div>
      )}

      {/* Numbered Pagination Row */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1.5 pt-2">
          {/* Previous Button */}
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-white/25 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Previous</span>
            <ChevronLeft className="w-4 h-4 sm:hidden" />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-orange-600 text-white shadow-md shadow-orange-600/30 scale-105"
                    : "bg-zinc-900/80 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-white/25 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 sm:hidden" />
          </button>
        </div>
      )}
    </div>
  );
}
