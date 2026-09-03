"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, EyeOff, Eye, Filter } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchModal } from "@/components/layout/search-modal";
import {
  ProductFilters,
  SortDropdown,
  ProductGrid,
  ProductGridSkeleton,
  PaginationControl,
  allMockProducts,
  ShopProduct,
} from "@/components/products";

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL parameters
  const categoryParam = searchParams.get("category") || "all";
  const sortParam = searchParams.get("sort") || "featured";
  const minPriceParam = Number(searchParams.get("minPrice")) || 450;
  const maxPriceParam = Number(searchParams.get("maxPrice")) || 1250;
  const pageParam = Number(searchParams.get("page")) || 1;

  // Local state
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [currentMinPrice, setCurrentMinPrice] = useState<number>(minPriceParam);
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number>(maxPriceParam);
  const [currentSort, setCurrentSort] = useState<string>(sortParam);
  const [currentPage, setCurrentPage] = useState<number>(pageParam);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accumulatedCount, setAccumulatedCount] = useState<number>(24);

  // Sync state with URL changes
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    setCurrentSort(searchParams.get("sort") || "featured");
    setCurrentMinPrice(Number(searchParams.get("minPrice")) || 450);
    setCurrentMaxPrice(Number(searchParams.get("maxPrice")) || 1250);
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  // Function to push URL query updates
  const updateQueryParams = (updates: Record<string, string | number | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "all") {
        current.delete(key);
      } else {
        current.set(key, String(value));
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  };

  // Filter handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateQueryParams({ category, page: 1 });
  };

  const handleFabricToggle = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (min: number, max: number) => {
    setCurrentMinPrice(min);
    setCurrentMaxPrice(max);
    setCurrentPage(1);
    updateQueryParams({ minPrice: min, maxPrice: max, page: 1 });
  };

  const handleSortChange = (sortValue: string) => {
    setCurrentSort(sortValue);
    updateQueryParams({ sort: sortValue });
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedFabrics([]);
    setCurrentMinPrice(450);
    setCurrentMaxPrice(1250);
    setCurrentSort("featured");
    setCurrentPage(1);
    router.push(pathname, { scroll: false });
  };

  // Filtered & Sorted Product Dataset
  const filteredProducts = useMemo(() => {
    let result = [...allMockProducts];

    // 1. Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    // 2. Fabric filter
    if (selectedFabrics.length > 0) {
      result = result.filter((p) => p.fabric && selectedFabrics.includes(p.fabric));
    }

    // 3. Price range filter
    result = result.filter((p) => p.price >= currentMinPrice && p.price <= currentMaxPrice);

    // 4. Sorting
    if (currentSort === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (currentSort === "bestSell") {
      result.sort((a, b) => (b.mrpPrice || b.price) - (a.mrpPrice || a.price));
    }

    return result;
  }, [selectedCategory, selectedFabrics, currentMinPrice, currentMaxPrice, currentSort]);

  // Paginated slices (hybrid accumulate/page)
  const itemsPerPage = 24;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage) || 1;
  const displayedProducts = filteredProducts.slice(0, accumulatedCount);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAccumulatedCount((prev) => Math.min(prev + itemsPerPage, totalProducts));
      setIsLoading(false);
    }, 400);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setAccumulatedCount(newPage * itemsPerPage);
    updateQueryParams({ page: newPage });
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090407] text-white selection:bg-rose-600 selection:text-white">
      {/* 1. Announcement Bar */}
      <AnnouncementBar text="FREE SHIPPING ON ORDERS OVER ৳5000" />

      {/* 2. Global Navbar */}
      <Navbar brandName="Ragno" />

      {/* 3. Page Header Banner (Collage Dark Style with Italic Serif Title) */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden flex items-center justify-center text-center select-none bg-zinc-950">
        {/* Background Artwork Banner */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1600&auto=format&fit=crop"
            alt="All Products Banner"
            fill
            priority
            className="object-cover object-center opacity-40 blur-xs scale-105"
          />
          {/* Radial & Linear Dark Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090407] via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-rose-950/20 mix-blend-color-dodge" />
        </div>

        {/* Heading Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif italic font-normal tracking-wide text-white drop-shadow-2xl">
            All Products
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-400">
            Curated Premium Apparel & Everyday Essentials
          </p>
        </div>
      </div>

      {/* 4. Main Shop Content Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Top Control Bar: Filter Toggle & Sort Dropdown */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/5">
          {/* Left: Desktop Hide Filters & Product Count */}
          <div className="flex items-center gap-4">
            {/* Desktop Hide Filters Toggle */}
            <button
              type="button"
              onClick={() => setShowSidebar(!showSidebar)}
              className="hidden lg:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
            >
              {showSidebar ? <EyeOff className="w-4 h-4 text-zinc-400" /> : <Eye className="w-4 h-4 text-zinc-400" />}
              <span>{showSidebar ? "Hide Filters" : "Show Filters"}</span>
            </button>

            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white border border-white/10"
            >
              <Filter className="w-3.5 h-3.5 text-orange-500" />
              <span>Filters</span>
            </button>

            {/* Showing Count */}
            <span className="text-xs font-medium text-zinc-400">
              Showing 1–{Math.min(displayedProducts.length, totalProducts)} of {totalProducts} products
            </span>
          </div>

          {/* Right: Sort By Dropdown */}
          <SortDropdown currentSort={currentSort} onSortChange={handleSortChange} />
        </div>

        {/* Layout Grid: Sidebar + Products */}
        <div className="mt-8 flex gap-8 items-start">
          {/* Left Sidebar (Desktop) */}
          {showSidebar && (
            <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 self-start bg-zinc-950/40 border border-white/5 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
              <ProductFilters
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                selectedFabrics={selectedFabrics}
                onToggleFabric={handleFabricToggle}
                minPrice={450}
                maxPrice={1250}
                currentMinPrice={currentMinPrice}
                currentMaxPrice={currentMaxPrice}
                onPriceChange={handlePriceChange}
                onResetFilters={handleResetFilters}
              />
            </aside>
          )}

          {/* Right: Product Grid & Pagination */}
          <section className="flex-1 w-full min-w-0">
            {isLoading ? (
              <ProductGridSkeleton count={6} />
            ) : (
              <ProductGrid products={displayedProducts} />
            )}

            {/* Hybrid Pagination & Load More */}
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              loadedProductsCount={Math.min(displayedProducts.length, totalProducts)}
              onPageChange={handlePageChange}
              onLoadMore={displayedProducts.length < totalProducts ? handleLoadMore : undefined}
              isLoadingMore={isLoading}
            />
          </section>
        </div>
      </main>

      {/* Mobile Filters Slide-over Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-[#10080d] border-l border-white/10 p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
              <ProductFilters
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  handleCategoryChange(cat);
                  setMobileDrawerOpen(false);
                }}
                selectedFabrics={selectedFabrics}
                onToggleFabric={handleFabricToggle}
                minPrice={450}
                maxPrice={1250}
                currentMinPrice={currentMinPrice}
                currentMaxPrice={currentMaxPrice}
                onPriceChange={handlePriceChange}
                onResetFilters={() => {
                  handleResetFilters();
                  setMobileDrawerOpen(false);
                }}
                isMobileDrawer
                onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Footer */}
      <Footer brandName="Ragno" />

      {/* Global Interactive Drawers */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
