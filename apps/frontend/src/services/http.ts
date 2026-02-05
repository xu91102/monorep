import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAppStore } from '../stores/app';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  code: number;
}

const createHttpInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      const { data } = response;
      if (!data.success) {
        const appStore = useAppStore();
        appStore.showToast(data.message || 'Request failed', 'error');
        return Promise.reject(new Error(data.message));
      }
      return response;
    },
    (error: AxiosError<ApiResponse>) => {
      const appStore = useAppStore();
      let message = 'Network Error';

      if (error.response) {
        const { status, data } = error.response;
        message = data?.message || getErrorMessage(status);

        if (status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } else if (error.request) {
        message = 'Server not responding';
      }

      appStore.showToast(message, 'error');
      return Promise.reject(error);
    },
  );

  return instance;
};

const getErrorMessage = (status: number): string => {
  const messages: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };
  return messages[status] || 'Unknown Error';
};

const http = createHttpInstance();

export const get = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  return http.get(url, config);
};

export const post = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  return http.post(url, data, config);
};

export const put = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  return http.put(url, data, config);
};

export const del = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<ApiResponse<T>>> => {
  return http.delete(url, config);
};

export default http;
