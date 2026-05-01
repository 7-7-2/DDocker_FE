import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';
import {useDeleteCacheData} from '@/hooks/useDeleteCacheData';

axios.defaults.withCredentials = true;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const authInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(
    async config => {
      const cached = await useGetCacheData('user', '/accessToken');
      if (config.headers && cached) {
        config.headers.Authorization = cached.cacheData;
      }
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      return Promise.reject(error);
    }
  );
  //Refresh token flow
  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('auth/refresh')
      ) {
        originalRequest._retry = true;

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = res.data.accessToken;
          await useSetCacheData('user', '/accessToken', newAccessToken);

          originalRequest.headers.Authorization = newAccessToken;
          return instance(originalRequest);
        } catch (refreshError) {
          await useDeleteCacheData('user', '/accessToken');
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Authorization 설정이 없는 일반 사용자 API용 Instance
export const baseInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

// Authorization 설정이 추가된 로그인한 사용자 API용 Instance --유저 API 에서 공통적으로 사용할 인스턴스
export const authInstance: AxiosInstance = authInterceptors(baseInstance);

export const storageInstance = (url: string) => {
  return axios.create({
    baseURL: url,
    withCredentials: false
  });
};
