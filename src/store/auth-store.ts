import { create } from "zustand";
import { User } from "@/types";
import Cookies from "js-cookie";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  hydrateSession: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: (user) => {
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  hydrateSession: () => {
    if (typeof window === "undefined") return;
    try {
      const userSessionStr = Cookies.get("user_session");
      if (userSessionStr) {
        const parsedUser = JSON.parse(userSessionStr);
        set({ user: parsedUser, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (e) {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
