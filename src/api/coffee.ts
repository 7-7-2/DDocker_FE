import { authInstance } from '@/api/axiosInterceptor';

// 1. 포스트 조회 : deprecated
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
    .get(`/caffeine/calendar?date=${activeMonth}`)
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};
