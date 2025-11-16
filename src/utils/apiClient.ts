import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { getAccessToken, setAccessToken } from './api';
import { OAUTH_ENDPOINTS } from '../api/endpoints';

// 리프레시 토큰 재발급 중복 방지
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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

      // 리프레시 토큰 요청 시 Authorization 헤더 제거
      if (config.url === OAUTH_ENDPOINTS.REISSUE) {
        delete config.headers?.Authorization;
        return config;
      }

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
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // 401 에러이고 리프레시 토큰 요청이 아닌 경우
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        // 리프레시 토큰 요청 자체가 401이면 무한 루프 방지
        if (originalRequest.url === OAUTH_ENDPOINTS.REISSUE) {
          const { logout } = useAuthStore.getState();
          logout();
          return Promise.reject(new Error('인증이 만료되었습니다.'));
        }

        // 이미 리프레시 중이면 대기
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers && token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // 리프레시 토큰 API 호출
          const response = await axiosInstance.post(
            OAUTH_ENDPOINTS.REISSUE,
            {},
            {
              headers: {
                Authorization: undefined,
              },
            },
          );

          // 응답 헤더에서 새 토큰 확인
          const authorizationHeader =
            response.headers.authorization || response.headers.Authorization;
          if (authorizationHeader) {
            const newToken =
              typeof authorizationHeader === 'string'
                ? authorizationHeader.replace('Bearer ', '')
                : authorizationHeader[0]?.replace('Bearer ', '') || '';

            if (newToken) {
              setAccessToken(newToken);
              isRefreshing = false;
              processQueue(null, newToken);

              // 원래 요청 재시도
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              return axiosInstance(originalRequest);
            }
          }

          throw new Error('토큰 재발급 실패');
        } catch (refreshError) {
          isRefreshing = false;
          processQueue(refreshError as Error, null);
          const { logout } = useAuthStore.getState();
          logout();
          return Promise.reject(new Error('인증이 만료되었습니다.'));
        }
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
