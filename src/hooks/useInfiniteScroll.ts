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
  initialPageParam: 1,
  getNextPageParam: (lastPage: Fetched) => {
    if (!lastPage.next) return undefined;
    return lastPage.next;
  }
};

export const FollowingListIQParam = () => {
  const { userId } = useParams();
  return {
    queryKey: ['followingList', userId as string],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      return getFollowingList(
        userId as string,
        pageParam
      ) as Promise<FetchedFollowing>;
    },
    initialPageParam: 1,
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
    queryFn: ({ pageParam }: { pageParam: number }) => {
      return getFollowerList(
        userId as string,
        pageParam
      ) as Promise<FetchedFollowing>;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: FetchedFollowing) => {
      if (!lastPage.next) return undefined;
      return lastPage.next;
    }
  };
};

export const SearchListMoreUserIQParam = (nickname: string) => {
  return {
    queryKey: ['searchListMoreUser', nickname],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      return getSearchMoreUser(nickname, pageParam) as Promise<Fetched>;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: Fetched | FetchedFollowing) => {
      if (!lastPage.next) return undefined;
      return lastPage.next;
    }
  };
};

export const getProfilePostIQParam = (): InfinitePosts => {
  const { userId } = useParams();
  return {
    queryKey: ['ProFilePosts', userId as string],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      return getUserProfilePosts(userId, pageParam) as Promise<Fetched>;
    },
    initialPageParam: 0,
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
    data: pages as FollowingPost[],
    hasNextPage,
    isFetching,
    fetchNextPage,
    isLoading,
    refetch
  };
};
