import { AtomAsyncData } from '@definitions/store';
import { signal, computed } from '@preact/signals-react';
import { logInDev } from '@utils/logUtils';

export const sigUsername = signal('Natsu Dragneel Signal');
export const sigNotificationCount = signal(0);
export const sigIsLoading = signal(false);
export const sigAsyncData = signal<AtomAsyncData>(null);

// Mutation action
export const incrementSignalNotifications = () => {
  sigNotificationCount.value += 1;
};

// Async action
export const fetchSignalData = async () => {
  sigIsLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  sigAsyncData.value = { title: 'Signal Data Fetched' };
  sigIsLoading.value = false;
};

// Computed signal  (Auto-Memoized + Performance Metrics)
const MOCK_DATA = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  value: i % 10,
}));
export const expensiveComputedSignal = computed(() => {
  const count = sigNotificationCount.value;
  performance.mark(`Signal_Filter_Start_${count}`);
  logInDev(`SIGNAL: Expensive filter logic ran count: ${count}`);
  const result = MOCK_DATA.filter((item) => item.value === count % 5);
  performance.mark(`Signal_Filter_End_${count}`);
  performance.measure(
    'Signal_Filter_Time',
    `Signal_Filter_Start_${count}`,
    `Signal_Filter_End_${count}`
  );
  return result;
});
