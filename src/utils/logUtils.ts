import { isDevMode } from './envUtils';

// Define a type for the log function parameters to allow any type of arguments
type LogArgs = unknown[];

export const logInDev = (...args: LogArgs): void => {
  if (isDevMode()) {
    console.log(
      '%c∴ LOGGING IN DEV',
      'font-family: monospace; font-size: 12px; color: green;'
    );
    console.log(...args);
  }
};

export const logErrorInDev = (...args: LogArgs): void => {
  if (isDevMode()) {
    console.log(
      '%c∴ LOGGING ERROR IN DEV',
      'font-family: monospace; font-size: 12px; color: red;'
    );
    console.error(...args);
  }
};
