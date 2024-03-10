import { useIntersection } from '@/hooks/useIntersection';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { InfinitePosts } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import useGetCacheData from '@/hooks/useGetCacheData';

export const useTargetInfiniteScroll = (param: InfinitePosts) => {
  const { data: signedIn } = useQuery({
    queryKey: ['signedIn'],
    queryFn: () => useGetCacheData('user', '/accessToken')
  });

  const { data, hasNextPage, isFetching, fetchNextPage, isLoading } =
    useInfiniteScroll(param, signedIn);

  const ref = useIntersection((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) fetchNextPage();
  });
  return { data, ref, isLoading };
};
