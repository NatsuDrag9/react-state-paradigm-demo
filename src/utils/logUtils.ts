import { LogArgsType, LogMessageLevel } from '@definitions/logUtilsTypes';
import { isDevMode } from './envUtils';
import Logger, { prodLogMessage } from './logHelperUtils';

/**
 * Logs messages in development mode with a specific calling location.
 * This function is used for standard log messages.
 *
 * @param args - The messages or objects to log.
 */
export const logInDev = (...args: LogArgsType): void => {
  if (isDevMode()) {
    Logger.info('LOGGING IN DEV', args);
  }
};

/**
 * Logs messages in development mode with full stack trace
 * This function is used detailed log messages with trace.
 *
 * @param args - The messages or objects to log.
 */
export const vLogInDev = (...args: LogArgsType): void => {
  if (isDevMode()) {
    Logger.debug('VERBOSE LOGGING IN DEV', args, true);
  }
};

/**
 * Logs errors in development mode with a specific calling location.
 * This function is used for error logging.
 *
 * @param args - The error messages or objects to log.
 */
export const logErrorInDev = (...args: LogArgsType): void => {
  if (isDevMode()) {
    Logger.error('LOGGING ERROR IN DEV', args);
  }
};

/**
 * Logs error messages in development mode with full stack trace
 * This function is used detailed error log messages with trace.
 *
 * @param args - The messages or objects to log.
 */
export const vLogErrorInDev = (...args: LogArgsType): void => {
  if (isDevMode()) {
    Logger.error('VERBOSE LOGGING ERROR IN DEV', args, true);
  }
};

/**
 * Logs messages in dev and production mode with a specific calling location.
 * This function is used for standard log messages.
 *
 * @param args - The messages or objects to log.
 */
export const logMessage = (...args: LogArgsType): void => {
  Logger.info('LOGGING IN DEV', args);
  prodLogMessage('info' as LogMessageLevel, 'LOGGING IN PROD', args, true);
};

/**
 * Logs error messages in development and production mode with full stack trace
 * This function is used detailed error log messages with trace.
 *
 * @param args - The messages or objects to log.
 */
export const logError = (...args: LogArgsType): void => {
  Logger.error('LOGGING ERROR IN DEV', args, true);
  prodLogMessage(
    'error' as LogMessageLevel,
    'LOGGING ERROR IN PROD',
    args,
    true
  );
};
