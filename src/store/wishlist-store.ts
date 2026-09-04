import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";
import { toggleWishlistAction } from "@/lib/actions/wishlist-actions";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product, userId?: string) => Promise<boolean>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.some((item) => item._id === product._id)) {
            return state;
          }
          return { items: [...state.items, product] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },

      toggleItem: async (product, userId) => {
        const currentlyWishlisted = get().isInWishlist(product._id);

        // 1. Optimistic Update
        if (currentlyWishlisted) {
          get().removeItem(product._id);
        } else {
          get().addItem(product);
        }

        // 2. Server Sync if user is logged in
        if (userId) {
          const res = await toggleWishlistAction(product._id, userId);
          if (!res.success) {
            // Rollback on server failure
            if (currentlyWishlisted) {
              get().addItem(product);
            } else {
              get().removeItem(product._id);
            }
            return currentlyWishlisted;
          }
        }

        return !currentlyWishlisted;
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item._id === productId);
      },

      clearWishlist: () => set({ items: [] }),

      getTotalItems: () => get().items.length,
    }),
    {
      name: "ragno-wishlist-store",
    }
  )
);
