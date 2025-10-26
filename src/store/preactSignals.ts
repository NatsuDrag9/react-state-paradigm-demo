import { AtomAsyncData } from '@definitions/store';
import { signal, computed } from '@preact/signals-react';
import { logErrorInDev, logInDev } from '@utils/logUtils';

export const sigUsername = signal('Natsu Dragneel Signal');
export const sigNotificationCount = signal(0);
export const sigIsLoading = signal(false);
export const sigAsyncData = signal<AtomAsyncData>(null);

// Create a computed signal for the title
export const sigDataTitle = computed(() => {
  return sigAsyncData.value?.title ?? 'N/A';
});

// Mutation action
export const incrementSignalNotifications = () => {
  logInDev('SIGNALS: increment notifications');
  sigNotificationCount.value += 1;
};

// Async action
export const fetchSignalData = async () => {
  sigIsLoading.value = true;
  logInDev('SIGNALS: ', '1. Loading: true');
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    // Fetch uses path relative to browser's current url
    const response = await fetch('/data/data.json');
    const data = await response.json();

    // Add a small delay after fetch to make loading state visible
    await new Promise((resolve) => setTimeout(resolve, 500));
    sigAsyncData.value = { title: data.title };
    sigIsLoading.value = false;
    logInDev('SIGNALS: ', '2. Data set, Loading: true');
  } catch (error) {
    logErrorInDev('SIGNALS: Fetch error', error);
    sigIsLoading.value = false;
    sigAsyncData.value = { title: 'Fetch error' };
  }
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
