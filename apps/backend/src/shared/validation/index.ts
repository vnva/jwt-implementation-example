import { badRequest } from '@hapi/boom';
import { Static, TSchema } from '@sinclair/typebox';
import Ajv from 'ajv';
import { RouterContext } from 'koa-router';

export const validate = <T extends TSchema>(
  schema: T,
  ctx: RouterContext
): Static<typeof schema> | never => {
  const ajv = new Ajv();
  const valid = ajv.validate(schema, ctx.request.body);

  if (!valid) {
    throw badRequest('Not valid data', ajv.errors);
  }

  return ctx.request.body as Static<typeof schema>;
};
