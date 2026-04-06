import { baseInstance } from '@/api/axiosInterceptor';

// 1. 유저 검색
export const getSearchUser = async (nickname: string) => {
  const res = await baseInstance.get(`/search?q=${nickname}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};
// 2. 유저 더보기
export const getSearchMoreUser = async (
  nickname: string,
  cursor?: string | null
) => {
  try {
    const res = await baseInstance.get('/search', {
      params: {
        q: nickname,
        cursor: cursor,
        limit: 10 // Increase limit for "more" view
      }
    });
    const resData = res.data.data;
    return {
      data: resData.results,
      next: resData.nextCursor
    };
  } catch (e) {
    console.log(e);
    return { data: [], next: null };
  }
};
