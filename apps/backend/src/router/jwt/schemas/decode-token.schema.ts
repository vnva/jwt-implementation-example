import { Type } from '@sinclair/typebox';

export const DecodeTokenSchema = Type.Object({
  secret: Type.String(),
  token: Type.String(),
});
