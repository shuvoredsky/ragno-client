"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getSubtotal, getTotalItems } =
    useCartStore();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e070b] border-l border-white/10 text-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <h2 className="text-base font-bold uppercase tracking-wider">
                Shopping Cart ({totalItems})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart drawer"
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-zinc-200">Your cart is empty</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Explore our premium collections and add your favorite apparel.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product._id}-${item.inventory?._id || idx}`}
                  className="flex gap-4 p-3 rounded-xl bg-zinc-950/70 border border-white/5"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-zinc-900">
                    <Image
                      src={item.product.thumbnailImage}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-200 line-clamp-1">
                        {item.product.name}
                      </h4>
                      {item.inventory?.size && (
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          Size: {item.inventory.size}
                        </p>
                      )}
                      <p className="text-xs font-black text-white mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-black/40">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product._id,
                              item.quantity - 1,
                              item.inventory?._id
                            )
                          }
                          className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product._id,
                              item.quantity + 1,
                              item.inventory?._id
                            )
                          }
                          className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.product._id, item.inventory?._id)}
                        className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-white/10 bg-black/60 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400 font-medium">Subtotal</span>
                <span className="text-base font-black text-white">{formatPrice(subtotal)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center rounded-full border border-white/20 hover:border-white text-white font-bold text-xs uppercase tracking-wider py-3 transition-colors text-center"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider py-3 transition-colors shadow-lg text-center"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
