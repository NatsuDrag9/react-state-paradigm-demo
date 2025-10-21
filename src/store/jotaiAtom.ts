import { AtomAsyncData } from '@definitions/store';
import { logInDev } from '@utils/logUtils';
import { atom } from 'jotai';

export const userNameAtom = atom('Fairy Tail');
export const notificationCountAtom = atom(0);
export const asyncDataAtom = atom<AtomAsyncData>(null);
export const isLoadingAtom = atom(false);

// Async write-only atom
export const asyncDataWriteAtom = atom(null, async (_, set) => {
  set(isLoadingAtom, true);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  set(asyncDataAtom, { title: 'Jotai Data Fetched' });
  set(isLoadingAtom, false);
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
