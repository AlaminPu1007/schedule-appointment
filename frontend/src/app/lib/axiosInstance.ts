/**
 * A axios global instance, all api request will be goes through this file
 */

import axios, { AxiosError, AxiosResponse } from 'axios';
import { isTokenExpired } from './isTokenExpiration';
import { destroyLocalStorage, getItem, removeItem } from './localStorage';
import { deleteCookie } from 'cookies-next';

interface ErrorResponse {
  message: string;
}
export interface CustomAxiosError extends AxiosError {
  response?: AxiosResponse<ErrorResponse>;
}

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

Api.interceptors.request.use(
  (config) => {
    const token = getItem('token');

    if (token) {
      if (isTokenExpired(token)) {
        removeItem('token');
        return Promise.reject(new Error('Token expired'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.status);

    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        deleteCookie('token');
        destroyLocalStorage();
        window.location.href = '/auth/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default Api;
