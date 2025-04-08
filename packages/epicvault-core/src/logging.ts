/**
 * Logging utilities for EpicVault
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export interface LoggerConfig {
  level: LogLevel;
  prefix?: string;
  timestamp?: boolean;
}

export class Logger {
  private static instance: Logger;
  private config: LoggerConfig;

  private constructor(config: LoggerConfig = { level: LogLevel.INFO }) {
    this.config = {
      level: config.level,
      prefix: config.prefix || 'EpicVault',
      timestamp: config.timestamp !== false
    };
  }

  public static getInstance(config?: LoggerConfig): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(config);
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const parts: string[] = [];

    if (this.config.timestamp) {
      parts.push(`[${new Date().toISOString()}]`);
    }

    parts.push(`[${this.config.prefix}]`);
    parts.push(`[${level}]`);
    parts.push(message);

    return parts.join(' ');
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    const currentLevelIndex = levels.indexOf(this.config.level);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  public debug(message: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message));
    }
  }

  public info(message: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage(LogLevel.INFO, message));
    }
  }

  public warn(message: string): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message));
    }
  }

  public error(message: string, error?: Error): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(LogLevel.ERROR, message));
      if (error) {
        console.error(error);
      }
    }
  }

  public setConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Export a default logger instance
export const logger = Logger.getInstance();
