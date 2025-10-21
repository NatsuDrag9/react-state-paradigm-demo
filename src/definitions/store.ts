export type StoreKeys = 'Zustand' | 'Jotai' | 'Signal';

export type Theme = 'light' | 'dark';

export interface ZustandAppState {
  username: string;
  theme: Theme;
  notificationCount: number;
}

export interface ZustandStoreState {
  appState: ZustandAppState;
  asyncData: { title: string } | null;
  isLoading: boolean;
  incrementNotifications: () => void;
  fetchData: () => Promise<void>;
}

export type AtomAsyncData = {
  title: string;
} | null;
