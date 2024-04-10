import { authInstance } from '@/api/axiosInterceptor';

// 1. 포스트 조회
export const getCoffeeIntake = async (activeMonth: string) => {
  const res = await authInstance
    .get(`/coffee/caffeine/${activeMonth}`)
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 2. 카페인 달력
export const getCoffeeCaledar = async (activeMonth: string) => {
  const res = await authInstance
    .get(`/coffee/calendar/${activeMonth}`)
    .catch(e => {
      console.log(e);
    });
  return res && res.data.setRes;
};
