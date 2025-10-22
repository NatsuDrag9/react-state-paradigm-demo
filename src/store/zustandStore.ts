import { ZustandStoreState } from '@definitions/store';
import { logInDev } from '@utils/logUtils';
import { create } from 'zustand';

export const useZustandStore = create<ZustandStoreState>((set) => ({
  // Centralized state
  usernameId: 0,
  appState: {
    username: 'Natsu Dragneel Zustand',
    theme: 'light',
    notificationCount: 0,
  },
  asyncData: null,
  isLoading: false,
  changeUsername: () =>
    set((state) => {
      const newUsernameId = state.usernameId + 1;
      logInDev('ZUSTAND: Changed username');
      return {
        usernameId: newUsernameId,
        appState: {
          ...state.appState,
          username: `Natsu Dragneel Zustand ${newUsernameId}`,
        },
      };
    }),
  incrementNotifications: () =>
    set((state) => {
      logInDev('ZUSTAND: incremented notifications');
      return {
        appState: {
          ...state.appState,
          notificationCount: state.appState.notificationCount + 1,
        },
      };
    }),
  fetchData: async () => {
    set({ isLoading: true });
    logInDev('ZUSTAND: ', '1. Loading: true');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ asyncData: { title: 'Zustand Data Fetched' }, isLoading: false });
    logInDev('ZUSTAND: ', '2. Data set, Loading: false');
  },
}));
