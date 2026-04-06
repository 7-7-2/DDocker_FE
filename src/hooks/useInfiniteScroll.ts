import { getFollowingPosts } from '@/api/post';
import { getFollowerList, getFollowingList } from '@/api/follow';
import { getUserProfilePosts } from '@/api/user';
import {
  Fetched,
  FetchedFollowing,
  FollowingPost,
  InfiniteFollowList,
  InfinitePosts
} from '@/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSearchMoreUser } from '@/api/search';

export const FollowingPostIQParam = {
  queryKey: ['followingPosts'],
  queryFn: getFollowingPosts,
  initialPageParam: null,
  getNextPageParam: (lastPage: Fetched) => {
    if (!lastPage.next) return undefined;
    return lastPage.next;
  }
};

export const FollowingListIQParam = () => {
  const { userId } = useParams();
  return {
    queryKey: ['followingList', userId as string],
    queryFn: ({ pageParam }: { pageParam: string | number | null }) => {
      return getFollowingList(
        userId as string,
        pageParam
      ) as Promise<FetchedFollowing>;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: FetchedFollowing) => {
      if (!lastPage.next) return undefined;
      return lastPage.next;
    }
  };
};

export const FollowerListIQParam = () => {
  const { userId } = useParams();
  return {
    queryKey: ['followerList', userId as string],
    queryFn: ({ pageParam }: { pageParam: string | number | null }) => {
      return getFollowerList(
        userId as string,
        pageParam
      ) as Promise<FetchedFollowing>;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: FetchedFollowing) => {
      if (!lastPage.next) return undefined;
      return lastPage.next;
    }
  };
};

export const SearchListMoreUserIQParam = (
  nickname: string,
  initialCursor: string | null = null
): InfinitePosts => {
  return {
    queryKey: ['searchListMoreUser', nickname],
    queryFn: ({ pageParam }: { pageParam: string | number | null }) => {
      return getSearchMoreUser(nickname, pageParam as string | null) as Promise<Fetched>;
    },
    initialPageParam: initialCursor,
    getNextPageParam: (lastPage: Fetched | FetchedFollowing) => {
      if (!lastPage.next) return undefined;
      return lastPage.next;
    }
  };
};

export const getProfilePostIQParam = (type: string): InfinitePosts => {
  const { userId } = useParams();
  return {
    queryKey: ['ProFilePosts', userId as string, type],
    queryFn: ({ pageParam }: { pageParam: string | number | null }) => {
      return getUserProfilePosts(
        userId,
        type as 'grid' | 'list',
        pageParam as string | null
      ) as Promise<Fetched>;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: Fetched | FetchedFollowing) => {
      if (!lastPage.next) return undefined;
      return lastPage.next;
    }
  };
};

export const useInfiniteScroll = (
  param: InfinitePosts | InfiniteFollowList,
  enabled: string
) => {
  const { data, hasNextPage, isFetching, fetchNextPage, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: param.queryKey,
      queryFn: param.queryFn,
      initialPageParam: param.initialPageParam,
      getNextPageParam: param.getNextPageParam,
      enabled: !!enabled
    });

  const pages = data?.pages.map(i => i.data).flat(2);
  return {
    data: pages as any[],
    hasNextPage,
    isFetching,
    fetchNextPage,
    isLoading,
    refetch
  };
};
