import { useIntersection } from '@/hooks/useIntersection';
import {
  useBaseInfiniteScroll,
  useInfiniteScroll
} from '@/hooks/useInfiniteScroll';
import {
  InfiniteFollowList,
  InfinitePosts,
  InfiniteSearchList
} from '@/types/types';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';

export const useTargetInfiniteScroll = (
  param: InfinitePosts | InfiniteFollowList | InfiniteSearchList,
  enabled = ''
) => {
  const { signedIn } = useGetSignedIn();

  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } = signedIn
    ? useInfiniteScroll(param, signedIn)
    : useBaseInfiniteScroll(param as InfinitePosts);

  const ref = useIntersection((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  if (enabled === '팔로워') {
    const {
      data: followerList,
      hasNextPage,
      isFetching,
      fetchNextPage
    } = useInfiniteScroll(param, enabled);
    const ref = useIntersection((entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) fetchNextPage();
    });

    return { followerList, ref };
  }

  if (enabled === '팔로잉') {
    const {
      data: followingList,
      hasNextPage,
      isFetching,
      fetchNextPage
    } = useInfiniteScroll(param, enabled);
    const ref = useIntersection((entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) fetchNextPage();
    });

    return { followingList, ref };
  }
  if (enabled === '검색') {
    const {
      data: searchMoreList,
      hasNextPage,
      isFetching,
      fetchNextPage
    } = useInfiniteScroll(param, enabled);
    const ref = useIntersection((entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isFetching) fetchNextPage();
    });

    return { searchMoreList, ref };
  }

  return { data, ref, isLoading };
};
