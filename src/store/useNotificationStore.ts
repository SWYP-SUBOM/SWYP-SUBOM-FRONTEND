import { create } from 'zustand';

interface NotificationState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  incrementUnreadCount: () => void;
  resetUnreadCount: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count: number) => {
    set({ unreadCount: count });
  },
  incrementUnreadCount: () => {
    set((state) => {
      const newCount = state.unreadCount + 1;
      return { unreadCount: newCount };
    });
  },
  resetUnreadCount: () => {
    set({ unreadCount: 0 });
  },
}));
