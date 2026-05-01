import { baseInstance } from '@/api/axiosInterceptor';
import Search from '@/pages/Page-Search';

// 1. 검색
export const getSearchUser = async (
  nickname: string,
  type: string,
  sort: string
) => {
  const res = await baseInstance
    .get(`/search?q=${nickname}&type=${type}&sort=${sort}`)
    .catch(e => {
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
        type: 'user',
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

// 3. 게시글 더보기
export const getSearchMorePost = async (
  search: string,
  sort: string,
  cursor?: string | null
) => {
  try {
    const res = await baseInstance.get('/search', {
      params: {
        q: search,
        type: 'post',
        sort: sort,
        cursor: cursor,
        limit: 10
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
