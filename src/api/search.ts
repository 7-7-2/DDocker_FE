import { baseInstance } from '@/api/axiosInterceptor';

// 1. 유저 검색
export const getSearchUser = async (nickname: string) => {
  const res = await baseInstance.get(`/search/${nickname}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
// 2. 유저 더보기
export const getSearchMoreUser = async (
  nickname: string,
  pageParam: number
) => {
  const res = await baseInstance
    .get(`/search/${nickname}/more/${pageParam}`)
    .catch(e => {
      console.log(e);
    });
  const data = res && res.data;
  return {
    data: data.data.results,
    next: data.data.next
  };
};
