import { baseInstance } from '@/api/axiosInterceptor';

// 1. 일간 인기 포스트 조회
export const getDailyPopular = async () => {
  const res = await baseInstance.get('/discovery/popular').catch(e => {
    console.log(e);
  });
  return res && res.data;
};
// 2. 브랜드별 인기 메뉴 조회
export const getWeeklyPopularBrandMenu = async (brand: string) => {
  const res = await baseInstance
    .get(`/discovery/brands/${brand}/popular-menu`)
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};
// 3. 브랜드별 인기 포스트 조회
export const getBrandPopularPosts = async (brand: string) => {
  const res = await baseInstance.get(`/discovery/brands/${brand}/popular`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
// 4. 브랜드별 최근 포스트 조회
export const getBrandRecentPosts = async (brand: string) => {
  const res = await baseInstance.get(`/discovery/brands/${brand}/recent`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
