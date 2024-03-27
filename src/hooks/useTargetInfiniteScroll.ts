import { useIntersection } from '@/hooks/useIntersection';
import {
  useBaseInfiniteScroll,
  useInfiniteScroll
} from '@/hooks/useInfiniteScroll';
import { InfinitePosts } from '@/types/types';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';

export const useTargetInfiniteScroll = (param: InfinitePosts) => {
  const { signedIn } = useGetSignedIn();

  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } = signedIn
    ? useInfiniteScroll(param, signedIn)
    : useBaseInfiniteScroll(param);

  const ref = useIntersection((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) fetchNextPage();
  });
  return { data, ref, isLoading };
};
