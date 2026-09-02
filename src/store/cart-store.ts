import { create } from "zustand";
import { Product, Inventory } from "@/types";

export interface CartStoreItem {
  product: Product;
  inventory?: Inventory;
  quantity: number;
}

interface CartStore {
  isOpen: boolean;
  items: CartStoreItem[];
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, inventory?: Inventory) => void;
  removeItem: (productId: string, inventoryId?: string) => void;
  updateQuantity: (productId: string, quantity: number, inventoryId?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  isOpen: false,
  items: [],

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, quantity = 1, inventory) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product._id === product._id &&
          (!inventory || item.inventory?._id === inventory._id)
      );

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
        return { items: newItems, isOpen: true };
      }

      return {
        items: [...state.items, { product, quantity, inventory }],
        isOpen: true,
      };
    });
  },

  removeItem: (productId, inventoryId) => {
    set((state) => ({
      items: state.items.filter(
        (item) =>
          !(item.product._id === productId && (!inventoryId || item.inventory?._id === inventoryId))
      ),
    }));
  },

  updateQuantity: (productId, quantity, inventoryId) => {
    if (quantity <= 0) {
      get().removeItem(productId, inventoryId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) => {
        if (item.product._id === productId && (!inventoryId || item.inventory?._id === inventoryId)) {
          return { ...item, quantity };
        }
        return item;
      }),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => {
      const price = item.product.price || item.product.mrpPrice || 0;
      return total + price * item.quantity;
    }, 0);
  },
}));
