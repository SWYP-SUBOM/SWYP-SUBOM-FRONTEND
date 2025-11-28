import { create } from 'zustand';

interface NotificationState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  incrementUnreadCount: () => void;
  resetUnreadCount: () => void;
}

const store = create<NotificationState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count: number) => {
    set({ unreadCount: count });
  },
  incrementUnreadCount: () => {
    set((state) => ({
      unreadCount: state.unreadCount + 1,
    }));
  },
  resetUnreadCount: () => {
    set({ unreadCount: 0 });
  },
}));

export const useNotificationStore = store;
