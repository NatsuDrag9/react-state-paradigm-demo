import {
  LogFunctionType,
  LogMessageLevel,
  LogMessageType,
} from '@definitions/logUtilsTypes';
import { detect } from 'detect-browser';
import { publicIp } from 'public-ip';
import { isDevMode } from './envUtils';

export class CustomLogger {
  private static getLogStyle(level: string): string {
    const baseStyle = 'font-family: monospace; font-size: 12px;';
    switch (level.toUpperCase()) {
      case 'INFO':
        return `${baseStyle} color: green;`;
      case 'WARN':
        return `${baseStyle} color: #F4D03F;`;
      case 'DEBUG':
        return `${baseStyle};`;
      case 'ERROR':
        return `${baseStyle} color: red;`;
      default:
        return baseStyle;
    }
  }

  public async info(
    prefix: string,
    args?: unknown[],
    includeStack = false
  ): Promise<void> {
    await this.devLog(console.log, 'INFO', prefix, args, includeStack);
  }

  public async debug(
    prefix: string,
    args?: unknown[],
    includeStack = false
  ): Promise<void> {
    await this.devLog(console.debug, 'DEBUG', prefix, args, includeStack);
  }

  public async warn(
    prefix: string,
    args?: unknown[],
    includeStack = false
  ): Promise<void> {
    await this.devLog(console.warn, 'WARN', prefix, args, includeStack);
  }

  public async error(
    prefix: string,
    args?: unknown[],
    includeStack = false
  ): Promise<void> {
    await this.devLog(console.error, 'ERROR', prefix, args, includeStack);
  }

  public async devLog(
    consoleMethod: LogFunctionType,
    level: string,
    prefix: string,
    args: unknown[] | undefined,
    includeStack = false
  ): Promise<void> {
    const logData = await this.createLogData(args || [], includeStack);
    const style = CustomLogger.getLogStyle(level);

    // Log all properties of logData in a single consoleMethod call
    console.group(`%c${prefix}: ${level}`, style);
    consoleMethod(
      `%cUserId: %s\nTimestamp: %s\nMessage: %o\nBrowser Info: %s\nIP Address: %s\nStack Trace: %s`,
      style,
      logData.userId,
      logData.timestamp,
      logData.message || '',
      logData?.browserInfo,
      logData?.ipAddress,
      logData?.stack
    );
    console.groupEnd();
  }

  // NOTE: Commented out body as not required in this app and gives ESLint error
  public async prodLog(
    _level: LogMessageLevel,
    _args: unknown[],
    _includeStack = false
  ): Promise<void> {
    // const logData = await this.createLogData(args, includeStack);
    // const formattedMessage = `${level.toUpperCase()}: ${JSON.stringify(logData, null, 2)}`;
  }

  // createLogData is left as an instance method (non-static) for potential customization in subclasses in future. Hence, disabled the following ESLint rule.

  private async createLogData(
    args: unknown[],
    includeStack: boolean
  ): Promise<LogMessageType> {
    // const state: RootState = store.getState();
    // const { token } = state.auth;
    const timestamp = new Date().toISOString();

    const logData: LogMessageType = {
      userId: null,
      timestamp,
      message: args.length === 1 ? args[0] : args,
    };

    if (!isDevMode()) {
      logData.browserInfo = CustomLogger.getBrowserInfo();
      logData.ipAddress = await CustomLogger.getIpAddress();
    }

    if (includeStack) {
      const error = new Error();
      logData.stack = CustomLogger.formatApiOrComponentStack(error.stack || '');
    }

    return logData;
  }

  private static formatApiOrComponentStack(stack: string): string {
    return stack
      .split('\n')
      .map((line) => {
        const componentMatch = line.match(/^(.*)@(.+):(\d+):(\d+)/);
        const apiMatch = line.match(/(https?:\/\/[^\s]+)/);

        if (componentMatch) {
          const [, component, url, lineNo, columnNo] = componentMatch;
          return `Component: ${component.trim()} \nFile: ${url} \nLine: ${lineNo}, Column: ${columnNo}`;
        }
        if (apiMatch) {
          const [apiUrl] = apiMatch;
          return `API Request Failed: ${apiUrl}`;
        }
        return line;
      })
      .join('\n');
  }

  private static getBrowserInfo(): string {
    const browser = detect();
    return browser ? `${browser.name} ${browser.version}` : 'Unknown Browser';
  }

  private static async getIpAddress(): Promise<string> {
    try {
      return await publicIp();
    } catch (error) {
      console.error('Error getting IP address:', error);
      return 'Unknown';
    }
  }
}

const Logger = new CustomLogger();

export const prodLogMessage = async (
  level: LogMessageLevel,
  prefix: string,
  args: unknown[],
  includeStack = false
): Promise<void> => {
  await Logger.prodLog(level, [`${prefix}: ${args.join(' ')}`], includeStack);
};

export default Logger;
