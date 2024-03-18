import { baseInstance } from '@/api/axiosInterceptor';

// 1. 유저 검색
export const getSearchUser = async (nickname: string) => {
  const res = await baseInstance.get(`/search/${nickname}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
