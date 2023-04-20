import ms from 'ms';

import { base64urlEncode, createSignature } from './helpers';
import { Header, Options, Payload } from './types';

export function encode<P extends object>(
  payload: Payload<P>,
  options: Options
): string {
  const header: Header = { typ: 'JWT', alg: 'HS256' };

  if (options.expiresIn) {
    payload.exp = Date.now() + ms(options.expiresIn);
  }

  const serializedHeader = base64urlEncode(JSON.stringify(header));
  const serializedPayload = base64urlEncode(JSON.stringify(payload));
  const signature = createSignature(
    serializedHeader,
    serializedPayload,
    options.secret
  );

  const segments = [serializedHeader, serializedPayload, signature];

  return segments.join('.');
}
