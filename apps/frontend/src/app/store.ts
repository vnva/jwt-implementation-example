import { create } from 'zustand';

import { jwtApi } from '@/shared/api/jwt';
import { JwtDecodeRequest, JwtEncodeRequest } from '@/shared/api/jwt/types';

interface AppStore {
  loading: boolean;
  token?: string;
  result?: 'error' | 'success';
  payload?: object;
  message?: string;
  secret?: string;
  encodeToken: (data: JwtEncodeRequest) => Promise<void>;
  decodeToken: (data: JwtDecodeRequest) => Promise<void>;
}

export const useAppStore = create<AppStore>((set) => ({
  loading: false,
  token: undefined,
  encodeToken: async (data) => {
    try {
      set({ loading: true });

      const { token } = await jwtApi.encode(data);

      set({ token, secret: data.secret });
    } catch {
      console.error('err');
    } finally {
      set({ loading: false });
    }
  },
  decodeToken: async (data) => {
    try {
      set({ loading: true });

      const response = await jwtApi.decode(data);

      if (response.result === 'success') {
        set({
          result: response.result,
          payload: response.payload,
          message: undefined,
        });
      } else {
        set({
          result: response.result,
          message: response.message,
        });
      }
    } catch {
      console.error('err');
    } finally {
      set({ loading: false });
    }
  },
}));
