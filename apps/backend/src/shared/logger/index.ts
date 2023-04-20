import winston from 'winston';

export type LoggerLevel = 'info' | 'warn' | 'error';

export const LOGGER_LEVELS: Record<LoggerLevel, number> = {
  info: 0,
  warn: 1,
  error: 3,
};

export const logger = winston.createLogger({
  levels: LOGGER_LEVELS,
  transports: [
    new winston.transports.Console({
      level: 'error',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});
