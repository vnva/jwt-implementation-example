export interface JwtEncodeRequest {
  secret: string;
  expiresIn?: string;
  payload?: object;
}

export interface JwtEncodeResponse {
  token: string;
}

export interface JwtDecodeRequest {
  secret: string;
  token: string;
}

export type JwtDecodeResponse =
  | { result: 'success'; payload: object }
  | { result: 'error'; message: string };
