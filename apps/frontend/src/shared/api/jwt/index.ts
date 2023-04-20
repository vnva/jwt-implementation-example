import { agent } from '@/app/agent';

import {
  JwtDecodeRequest,
  JwtDecodeResponse,
  JwtEncodeRequest,
  JwtEncodeResponse,
} from './types';

export const jwtApi = {
  async encode(request: JwtEncodeRequest) {
    const { data } = await agent.post<JwtEncodeResponse>(
      '/jwt/encode',
      request
    );

    return data;
  },
  async decode(request: JwtDecodeRequest) {
    const { data } = await agent.post<JwtDecodeResponse>(
      '/jwt/decode',
      request
    );

    return data;
  },
};
