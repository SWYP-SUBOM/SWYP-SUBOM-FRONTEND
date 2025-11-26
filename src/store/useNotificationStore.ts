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
    console.log('useNotificationStore: setUnreadCount 호출', count);
    set({ unreadCount: count });
  },
  incrementUnreadCount: () => {
    set((state) => {
      const newCount = state.unreadCount + 1;
      console.log('useNotificationStore: incrementUnreadCount', state.unreadCount, '->', newCount);
      return { unreadCount: newCount };
    });
  },
  resetUnreadCount: () => {
    console.log('useNotificationStore: resetUnreadCount');
    set({ unreadCount: 0 });
  },
}));
