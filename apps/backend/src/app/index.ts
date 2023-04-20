import { isBoom } from '@hapi/boom';
import Koa from 'koa';
import koaBody from 'koa-body';

import router from '@/router';
import { loggerMiddleware } from '@/shared/logger/middleware';

export function createApp() {
  const app = new Koa();

  app.use(koaBody());
  app.use(loggerMiddleware);

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      if (isBoom(error)) {
        ctx.status = error.output.payload.statusCode;
        ctx.body = {
          ...error.output.payload,
          data: (error.data as object) ?? undefined,
        };
      }
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}
