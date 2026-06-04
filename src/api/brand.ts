import { authInstance } from '@/api/axiosInterceptor';

// 1. 브랜드 인기 메뉴 top3 조회
export const getPopularRanking = async (brandName: string) => {
  const res = await authInstance.get(`/brand/${brandName}/popular`).catch(e => {
    console.log(e);
  });
  return res && res.data.data;
};

// 2. 동일 메뉴 조회
export const getProductComparison = async (
  brandName: string,
  productName: string
) => {
  const res = await authInstance
    .get(`/brand/comparison?brandName=${brandName}&productName=${productName}`)
    .catch(e => {
      console.log(e);
    });

  return res && res.data.data;
};
