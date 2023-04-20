import axios, { isAxiosError } from 'axios';

import { HttpError } from './error';

export const agent = axios.create({
  baseURL: '/api',
});

agent.interceptors.response.use(
  (resonse) => {
    return resonse;
  },
  async (error) => {
    if (isAxiosError(error) && error.response && error.config) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (error.response.status === 401 && !error.config._retry) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        error.config._retry = true;
        try {
          // refresh there
          return agent(error.config);
        } catch {
          throw new HttpError(401, error.response.data);
        }
      } else {
        throw new HttpError(error.response.status, error.response.data);
      }
    }

    throw new HttpError(500);
  }
);
