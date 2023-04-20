import { createHmac } from 'crypto';

export function base64urlDecode(str: string) {
  return Buffer.from(base64urlUnescape(str), 'base64').toString();
}

export function base64urlUnescape(str: string) {
  str += new Array(5 - (str.length % 4)).join('=');
  return str.replace(/-/g, '+').replace(/_/g, '/');
}

export function base64urlEncode(str: string) {
  return base64urlEscape(Buffer.from(str).toString('base64'));
}

export function base64urlEscape(str: string) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function createSignature(
  serializedHeader: string,
  serializedPayload: string,
  secret: string
) {
  return base64urlEscape(
    createHmac('sha256', secret)
      .update(serializedHeader + '.' + serializedPayload)
      .digest('base64')
  );
}
