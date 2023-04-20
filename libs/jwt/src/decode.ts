import { base64urlDecode, createSignature } from './helpers';
import { Header, Payload } from './types';

export function decode<P extends object>(
  token: string,
  secret: string
): Payload<P> {
  const segments = token.split('.');

  if (segments.length !== 3) throw new Error('Not enough or too many segments');

  const [serializedHeader, serializedPayload, signature] = segments;

  let header: Header;
  let payload: Payload<P>;

  try {
    header = JSON.parse(base64urlDecode(serializedHeader)) as Header;
    payload = JSON.parse(base64urlDecode(serializedPayload)) as Payload<P>;
  } catch {
    throw new Error('Signature verification failed');
  }

  if (header.alg !== 'HS256') {
    throw new Error('Algorithm not supported');
  }

  if (!verify(serializedHeader, serializedPayload, signature, secret)) {
    throw new Error('Signature verification failed');
  }

  if (payload.exp && Date.now() > payload.exp) {
    throw new Error('Token expired');
  }

  return payload;
}

function verify(
  serializedHeader: string,
  serializedPayload: string,
  signature: string,
  secret: string
) {
  return (
    createSignature(serializedHeader, serializedPayload, secret) === signature
  );
}
