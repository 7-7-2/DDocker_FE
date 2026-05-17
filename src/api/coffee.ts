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
  return res && res.data.data;
};

// 3. 카페인 섭취 내역 - 게시물로 등록되었을 경우 게시물 ID 조회
export const getPostId = async (caffeineId: string) => {
  const res = await authInstance
    .get(`/caffeine/intake/${caffeineId}/post`)
    .catch(e => {
      console.log(e);
    });
  return res && res.data.data;
};

// 4. 카페인 섭취 내역 - 삭제
export const deleteCaffeineIntake = async (caffeineId: string) => {
  await authInstance.delete(`/caffeine/intake/${caffeineId}`).catch(e => {
    console.log(e);
  });
  return;
};
