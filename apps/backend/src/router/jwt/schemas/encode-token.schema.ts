import { Type } from '@sinclair/typebox';

export const EncodeTokenSchema = Type.Object({
  secret: Type.String(),
  expiresIn: Type.Optional(Type.String()),
  payload: Type.Optional(Type.Object({})),
});
