import { AtomAsyncData } from '@definitions/store';
import { logErrorInDev, logInDev } from '@utils/logUtils';
import { atom } from 'jotai';

export const userNameAtom = atom('Natsu Dragneel Jotai');
export const notificationCountAtom = atom(0);
export const asyncDataAtom = atom<AtomAsyncData>(null);
export const isLoadingAtom = atom(false);

// Async write-only atom
export const asyncDataWriteAtom = atom(null, async (_, set) => {
  set(isLoadingAtom, true);
  logInDev('JOTAI: ', '1. Loading: true');
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    // Fetch uses path relative to browser's current url
    const response = await fetch('/data/data.json');
    const data = await response.json();

    // Add a small delay after fetch to make loading state visible
    await new Promise((resolve) => setTimeout(resolve, 500));

    set(asyncDataAtom, { title: data.title });
    set(isLoadingAtom, false);
    logInDev('JOTAI: ', '2. Data set, Loading: false');
  } catch (error) {
    logErrorInDev('JOTAI: Fetch error', error);
    set(isLoadingAtom, false);
    set(asyncDataAtom, { title: 'Fetch Error' });
  }
});

// Derived Atom (Auto-Memoized + Performance Metrics
const MOCK_DATA = Array.from({ length: 1000 }, (_, i) => ({
  id: 1,
  value: i % 10,
}));

export const expensiveFilterAtom = atom((get) => {
  const count = get(notificationCountAtom);
  performance.mark(`Jotai_Filter_Start_${count}`);
  logInDev(`JOTAI: Expensive Filter Logic Ran with Count: ${count}`);
  const result = MOCK_DATA.filter((item) => item.value === count % 5);
  performance.mark(`Jotai_Filter_End_${count}`);
  performance.measure(
    'Jotai_Filter_Time',
    `Jotai_Filter_Start_${count}`,
    `Jotai_Filter_End_${count}`
  );
  return result;
});
