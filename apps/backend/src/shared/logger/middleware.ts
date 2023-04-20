import { Middleware } from 'koa';

import { LoggerLevel, logger } from '.';

const getLoggerLoggerLevel = (status: number): LoggerLevel => {
  switch (Math.floor(status / 100)) {
    case 5:
      return 'error';
    case 4:
      return 'warn';
    default:
      return 'info';
  }
};

export const loggerMiddleware: Middleware = async (ctx, next) => {
  const start = new Date();
  await next();
  const duration = new Date().getMilliseconds() - start.getMilliseconds();

  logger.log({
    level: getLoggerLoggerLevel(ctx.status),
    message: `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${duration}ms`,
  });
};
