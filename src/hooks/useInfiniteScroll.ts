import { getFollowingPosts } from '@/api/post';
import { getUserProfilePosts } from '@/api/user';
import { Fetched, InfinitePosts } from '@/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const FollowingPostIQParam = {
  queryKey: ['followingPosts'],
  queryFn: getFollowingPosts,
  initialPageParam: 1,
  getNextPageParam: (lastPage: Fetched) => {
    if (!lastPage.next) return undefined;
    return lastPage.next;
  }
};

export const getProfilePostIQParam = () => {
  const { userId } = useParams();
  return {
    queryKey: ['ProFilePosts', userId as string],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      return getUserProfilePosts(userId, pageParam) as Promise<Fetched>;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: Fetched) => {
      if (!lastPage.next) return undefined;
      return lastPage.next;
    }
  };
};

export const useInfiniteScroll = (param: InfinitePosts, enabled: string) => {
  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: param.queryKey,
      queryFn: param.queryFn,
      initialPageParam: param.initialPageParam,
      getNextPageParam: param.getNextPageParam,
      enabled: !!enabled
    });

  const pages = data?.pages.map(i => i.data).flat(2);
  return { data: pages, hasNextPage, isFetching, fetchNextPage, isLoading };
};

export const useBaseInfiniteScroll = (param: InfinitePosts) => {
  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: param.queryKey,
      queryFn: param.queryFn,
      initialPageParam: param.initialPageParam,
      getNextPageParam: param.getNextPageParam
    });

  const pages = data?.pages.map(i => i.data).flat(2);
  return { data: pages, hasNextPage, isFetching, fetchNextPage, isLoading };
};
