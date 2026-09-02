"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  brandName?: string;
  links?: NavLink[];
}

const defaultLinks: NavLink[] = [
  { label: "SHOP", href: "/products" },
  { label: "NEW ARRIVALS", href: "/products?isNewArrival=true" },
  { label: "OUR STORY", href: "/about-us" },
  { label: "CONTACT", href: "/contact" },
];

export function Navbar({
  brandName = "HEEMS",
  links = defaultLinks,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, getTotalItems } = useCartStore();
  const { openSearch } = useUiStore();
  const totalCartItems = getTotalItems();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090407]/90 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo / Avatar */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-700 via-rose-700 to-rose-900 border border-white/20 flex items-center justify-center text-white font-black text-sm sm:text-base tracking-tighter shadow-md group-hover:scale-105 transition-transform">
            <span>H</span>
          </div>
          <span className="font-black tracking-widest text-lg sm:text-xl text-white uppercase sm:hidden lg:inline-block">
            {brandName}
          </span>
        </Link>

        {/* Center: Floating Navigation Pill Bar (Desktop) */}
        <nav className="hidden md:flex items-center bg-zinc-950/70 backdrop-blur-lg border border-white/10 rounded-full p-1.5 shadow-xl">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.split("?")[0]);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions & Cart & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search products"
            className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart Trigger with Count Badge */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-scale-in shadow-sm">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Explore / Premium CTA Button */}
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white text-zinc-200 hover:text-black font-bold text-xs uppercase tracking-wider px-4 sm:px-5 py-2 transition-all duration-300 shadow-sm"
          >
            Explore Collection
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d060a] border-b border-white/10 px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.split("?")[0]);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-colors ${
                    isActive
                      ? "bg-white text-black"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider py-3 shadow-md"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
