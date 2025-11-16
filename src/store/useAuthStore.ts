import { create } from 'zustand';
import { getAccessToken, setAccessToken, removeAccessToken } from '../utils/api';

interface User {
  name?: string;
  email?: string;
  [key: string]: unknown;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  setToken: (token: string) => {
    setAccessToken(token);
    set({ token, isLoggedIn: true });
  },

  setUser: (user: User) => {
    set({ user });
  },

  logout: () => {
    removeAccessToken();
    set({ isLoggedIn: false, user: null, token: null });
  },

  checkAuth: () => {
    const token = getAccessToken();
    if (token) {
      set({ token, isLoggedIn: true });
    } else {
      set({ token: null, isLoggedIn: false, user: null });
    }
  },
}));
