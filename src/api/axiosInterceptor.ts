import axios, { AxiosError, AxiosInstance } from 'axios';
import useGetCacheData from '@/hooks/useGetCacheData';

axios.defaults.withCredentials = true;

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
