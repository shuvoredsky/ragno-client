import { create } from "zustand";
import { User } from "@/types";
import { removeAccessToken, setAccessToken } from "@/lib/utils";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: (user, token) => {
    setAccessToken(token);
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    removeAccessToken();
    set({ user: null, isAuthenticated: false });
  },
}));
