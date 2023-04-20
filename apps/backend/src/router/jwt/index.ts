import Router from 'koa-router';

import { encode, decode } from '@libs/jwt';

import { validate } from '@/shared/validation';

import { DecodeTokenSchema } from './schemas/decode-token.schema';
import { EncodeTokenSchema } from './schemas/encode-token.schema';

export const jwtRouter = new Router({ prefix: '/jwt' });

jwtRouter.post('/encode', (ctx) => {
  const {
    payload = {},
    secret = '',
    expiresIn,
  } = validate(EncodeTokenSchema, ctx);

  ctx.body = {
    token: encode(payload, { secret, expiresIn }),
  };
});

jwtRouter.post('/decode', (ctx) => {
  const { secret, token } = validate(DecodeTokenSchema, ctx);

  try {
    const payload = decode(token, secret);

    ctx.body = {
      result: 'success',
      payload,
    };
  } catch (e) {
    if (e instanceof Error) {
      ctx.body = {
        result: 'error',
        message: e.message,
      };
      return;
    }

    ctx.body = {
      result: 'error',
      message: 'Unknown error',
    };
  }
});
