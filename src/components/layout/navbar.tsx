"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, X, User as UserIcon, LogOut, Package, UserCircle, Settings } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

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
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const { openCart, getTotalItems } = useCartStore();
  const { openSearch } = useUiStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const totalCartItems = getTotalItems();

  // Close account dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setAccountDropdownOpen(false);
    toast.success("Successfully logged out");
    router.push("/");
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

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

        {/* Right: Actions & User & Cart */}
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

          {/* User / Account Icon & Dropdown Menu */}
          <div className="relative" ref={accountRef}>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                aria-label="User account menu"
                className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-white/20 text-white font-bold text-xs flex items-center justify-center transition-all shadow-sm focus:outline-none"
              >
                <span>{userInitial}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                aria-label="Account options"
                className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              >
                <UserIcon className="w-4 h-4" />
              </button>
            )}

            {/* Account Dropdown */}
            {accountDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#11080e] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                {isAuthenticated ? (
                  <>
                    {/* User info banner */}
                    <div className="px-3 py-2.5 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{user?.name || "Customer"}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{user?.email || user?.phone || ""}</p>
                    </div>

                    <div className="py-1 space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <UserCircle className="w-4 h-4 text-zinc-400" />
                        My Profile
                      </Link>
                      <Link
                        href="/profile/orders"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Package className="w-4 h-4 text-zinc-400" />
                        My Orders
                      </Link>
                      <Link
                        href="/profile/settings"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-zinc-400" />
                        Settings
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-white/10">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-1 space-y-1">
                    <div className="px-3 py-2 text-left">
                      <p className="text-xs font-bold text-white">Welcome</p>
                      <p className="text-[11px] text-zinc-400">Access your account & orders</p>
                    </div>
                    <Link
                      href="/login"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="block w-full text-center py-2 px-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-sm"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="block w-full text-center py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/5"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

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

            {/* Mobile Account Links */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-1 text-xs text-zinc-400">
                    Signed in as <span className="text-white font-bold">{user?.name}</span>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-white/5"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/profile/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-white/5"
                  >
                    My Orders
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-950/30"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider py-2.5 shadow-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider py-2.5 border border-white/10"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-2">
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
