export interface LogMessageType {
  userId: string | null;
  timestamp: string;
  message: unknown | unknown[];
  browserInfo?: string;
  ipAddress?: string;
  stack?: string;
}

export type LogArgsType = unknown[];

export type LogFunctionType = (
  message: string,
  ...optionalParams: LogArgsType
) => void;

export type LogMessageLevel = 'error' | 'warning' | 'info' | 'debug';
