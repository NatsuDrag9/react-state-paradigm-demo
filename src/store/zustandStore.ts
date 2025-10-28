import { ZustandStoreState } from '@definitions/store';
import { logErrorInDev, logInDev } from '@utils/logUtils';
import { create } from 'zustand';

// --- MOCK DATA FOR EXPENSIVE COMPUTATION ---
const MOCK_DATA = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  value: i % 10,
}));

// --- EXPENSIVE COMPUTATION LOGIC (INTERNAL TO STORE) ---
export const expensiveFilterLogic = (
  notificationCount: number,
  memoized: boolean
) => {
  performance.mark(`Zustand_Filter_Start_${notificationCount}`);
  logInDev(
    `ZUSTAND ${memoized ? '(memoized)' : '(unmemoized)'}: Expensive filter logic ran count: ${notificationCount}`
  );

  // The actual expensive calculation: filter based on the notification count
  const result = MOCK_DATA.filter(
    (item) => item.value === notificationCount % 5
  );

  performance.mark(`Zustand_Filter_End_${notificationCount}`);
  performance.measure(
    'Zustand_Filter_Time',
    `Zustand_Filter_Start_${notificationCount}`,
    `Zustand_Filter_End_${notificationCount}`
  );
  return result;
};

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
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      // Fetch uses path relative to browser's current url
      const response = await fetch('/data/data.json');
      const data = await response.json();

      // Add a small delay after fetch to make loading state visible
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ asyncData: { title: data.title }, isLoading: false });
      logInDev('ZUSTAND: ', '2. Data set, Loading: false');
    } catch (error) {
      logErrorInDev('ZUSTAND: Fetch error', error);
      set({ asyncData: { title: 'Fetch error' }, isLoading: false });
    }
  },
}));
