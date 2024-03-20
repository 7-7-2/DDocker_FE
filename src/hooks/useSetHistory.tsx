import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';
import { SimplifyUser } from '@/types/types';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

export const useSetHistory = () => {
  const { data: cachedHistory } = useQuery({
    queryKey: ['cachedHistory'],
    queryFn: () => useGetCacheData('search', '/user')
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: SimplifyUser) => {
      !cachedHistory && (await useSetCacheData('search', '/user', [data]));
      cachedHistory &&
        (await useSetCacheData('search', '/user', [
          ...cachedHistory.cacheData,
          data
        ]));
    }
  });

  const { mutate: reset } = useMutation({
    mutationFn: async () => {
      await useSetCacheData('search', '/user', []);
      queryClient.invalidateQueries({ queryKey: ['cachedHistory'] });
    }
  });

  const { mutate: remove } = useMutation({
    mutationFn: async (data: SimplifyUser) => {
      await useSetCacheData(
        'search',
        '/user',
        cachedHistory.cacheData.filter(
          (user: SimplifyUser) => user.userId !== data.userId
        )
      );
      queryClient.invalidateQueries({ queryKey: ['cachedHistory'] });
    }
  });

  return { mutate, reset, remove };
};
