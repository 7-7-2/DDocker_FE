import { getFollowingPosts } from '@/api/post';
import { Fetched, InfinitePosts } from '@/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const FollowingPostIQParam = {
  queryKey: ['followingPosts'],
  queryFn: getFollowingPosts,
  initialPageParam: 1,
  getNextPageParam: (lastPage: Fetched) => {
    if (!lastPage.next) return undefined;
    return lastPage.next;
  }
};
export const useInfiniteScroll = (param: InfinitePosts, enabled: string) => {
  const validToken = enabled && enabled.includes('Bearer');
  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: param.queryKey,
      queryFn: param.queryFn,
      initialPageParam: param.initialPageParam,
      getNextPageParam: param.getNextPageParam,
      enabled: !!validToken
    });

  const pages = data?.pages.map(i => i.data).flat(2);
  return { data: pages, hasNextPage, isFetching, fetchNextPage, isLoading };
};
