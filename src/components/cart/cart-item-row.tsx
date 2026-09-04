"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { CartStoreItem, useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface CartItemRowProps {
  item: CartStoreItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem, addItem } = useCartStore();

  const maxStock = item.inventory?.availableQuantity ?? 99;
  const itemTotal = item.product.price * item.quantity;
  const productSlug = item.product.slug || item.product._id;

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product._id, item.quantity - 1, item.inventory?._id);
    } else {
      handleRemove();
    }
  };

  const handleIncrease = () => {
    if (item.quantity < maxStock) {
      updateQuantity(item.product._id, item.quantity + 1, item.inventory?._id);
    } else {
      toast.error(`Only ${maxStock} items available in stock`);
    }
  };

  const handleRemove = () => {
    const removedItem = { ...item };
    removeItem(item.product._id, item.inventory?._id);
    toast.success(`Removed ${item.product.name} from cart`, {
      action: {
        label: "Undo",
        onClick: () => {
          addItem(removedItem.product, removedItem.quantity, removedItem.inventory);
        },
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-white/20 transition-all">
      {/* Product Thumbnail & Details */}
      <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
        <Link
          href={`/products/${productSlug}`}
          className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0 group"
        >
          <Image
            src={item.product.thumbnailImage}
            alt={item.product.name}
            fill
            sizes="100px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="space-y-1 min-w-0 flex-1">
          <Link
            href={`/products/${productSlug}`}
            className="text-xs sm:text-sm font-bold text-white hover:text-orange-400 transition-colors line-clamp-1"
          >
            {item.product.name}
          </Link>

          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
            <span>Size: <strong className="text-zinc-200">{item.inventory?.size || "Free Size"}</strong></span>
          </div>

          <div className="text-xs font-bold text-orange-500 sm:hidden pt-1">
            {formatPrice(item.product.price)}
          </div>
        </div>
      </div>

      {/* Quantity & Pricing Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
        {/* Unit Price (Desktop) */}
        <div className="hidden sm:block text-right w-24">
          <div className="text-xs text-zinc-500 font-medium">Unit Price</div>
          <div className="text-xs sm:text-sm font-bold text-zinc-200">
            {formatPrice(item.product.price)}
          </div>
        </div>

        {/* Quantity Stepper */}
        <div className="inline-flex items-center rounded-xl bg-zinc-900 border border-white/15 p-1">
          <button
            type="button"
            onClick={handleDecrease}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>

          <span className="w-9 text-center text-xs font-bold text-white select-none">
            {item.quantity}
          </span>

          <button
            type="button"
            disabled={item.quantity >= maxStock}
            onClick={handleIncrease}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Item Total Subtotal */}
        <div className="text-right w-24">
          <div className="hidden sm:block text-xs text-zinc-500 font-medium">Total</div>
          <div className="text-xs sm:text-sm font-black text-white">
            {formatPrice(itemTotal)}
          </div>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove item"
          className="p-2 rounded-xl text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
