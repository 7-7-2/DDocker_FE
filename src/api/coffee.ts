import { authInstance } from '@/api/axiosInterceptor';

// 1. 포스트 조회
export const getCoffeeIntake = async () => {
  const res = await authInstance.get(`/coffee/caffeine`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
