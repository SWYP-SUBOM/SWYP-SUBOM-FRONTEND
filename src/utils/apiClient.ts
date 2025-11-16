import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { getAccessToken, setAccessToken } from './api';

const createAxiosInstance = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();

      if (config.url === '/') {
        delete config.headers?.Authorization;
        return config;
      }
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        const { logout } = useAuthStore.getState();
        logout();
        return Promise.reject(new Error('인증이 만료되었습니다.'));
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

const axiosInstance = createAxiosInstance();

export const get = async <T>(endpoint: string, config?: InternalAxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.get<T>(endpoint, config);
  return response.data;
};

export const post = async <T>(
  endpoint: string,
  data?: unknown,
  config?: InternalAxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.post<T>(endpoint, data, config);
  return response.data;
};

export const put = async <T>(
  endpoint: string,
  data?: unknown,
  config?: InternalAxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.put<T>(endpoint, data, config);
  return response.data;
};

export const remove = async <T>(
  endpoint: string,
  data?: unknown,
  config?: InternalAxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.delete<T>(endpoint, {
    ...config,
    data,
  });
  return response.data;
};

export const postForm = async <T>(
  endpoint: string,
  data: Record<string, string>,
  config?: InternalAxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.post<T>(endpoint, new URLSearchParams(data), {
    ...config,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...config?.headers,
    },
  });
  return response.data;
};

export const OAuthToken = async (endpoint: string): Promise<string> => {
  const response = await axiosInstance.post(
    endpoint,
    {},
    {
      headers: {
        Authorization: undefined,
      },
    },
  );

  const authorizationHeader = response.headers.authorization || response.headers.Authorization;
  if (authorizationHeader) {
    const token =
      typeof authorizationHeader === 'string'
        ? authorizationHeader.replace('Bearer ', '')
        : authorizationHeader[0]?.replace('Bearer ', '') || '';

    if (token) {
      setAccessToken(token);
      return token;
    }
  }

  throw new Error('응답 헤더에서 Authorization 헤더를 찾을 수 없습니다');
};

export const apiClient = {
  get,
  post,
  put,
  remove,
  postForm,
  OAuthToken,
};
