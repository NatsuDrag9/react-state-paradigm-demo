export type StoreKeys = 'Zustand' | 'Jotai' | 'Signal';

export type Theme = 'light' | 'dark';

export interface ZustandAppState {
  username: string;
  theme: Theme;
  notificationCount: number;
}

export type AtomAsyncData = {
  title: string;
} | null;

export interface ZustandStoreState {
  usernameId: number;
  appState: ZustandAppState;
  asyncData: AtomAsyncData;
  isLoading: boolean;
  changeUsername: () => void;
  incrementNotifications: () => void;
  fetchData: () => Promise<void>;
}
