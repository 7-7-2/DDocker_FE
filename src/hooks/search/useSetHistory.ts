import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';
import { SimplifyUser } from '@/types/types';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

export const useSetHistory = () => {
  const { userId } = useCachedUserInfo();
  const { data: cachedHistory } = useQuery({
    queryKey: ['cachedHistory'],
    queryFn: () => useGetCacheData('search', `/user-${userId}`),
    enabled: !!userId
  });
  
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: SimplifyUser) => {
      if (!userId) return;
      !cachedHistory &&
        (await useSetCacheData('search', `/user-${userId}`, [data]));
      if (cachedHistory) {
        const newDataExists = cachedHistory.cacheData.some(
          (item: SimplifyUser) => item.userId === data.userId
        );
        !newDataExists &&
          (await useSetCacheData('search', `/user-${userId}`, [
            ...cachedHistory.cacheData,
            data
          ]));
      }
    }
  });

  const { mutate: mutateHistory } = useMutation({
    mutationFn: async (data: SimplifyUser) => {
      if (!userId) return;
      !cachedHistory &&
        (await useSetCacheData('search', `/user-${userId}`, [data]));
      if (cachedHistory) {
        const newDataExists = cachedHistory.cacheData.some(
          (item: SimplifyUser) => item.keyword === data.keyword
        );
        !newDataExists &&
          (await useSetCacheData('search', `/user-${userId}`, [
            ...cachedHistory.cacheData,
            data
          ]));
      }
    }
  });

  const { mutate: reset } = useMutation({
    mutationFn: async () => {
      if (!userId) return;
      await useSetCacheData('search', `/user-${userId}`, []);
      queryClient.invalidateQueries({ queryKey: ['cachedHistory'] });
    }
  });

  const { mutate: remove } = useMutation({
    mutationFn: async (data: SimplifyUser) => {
      if (!userId) return;
      await useSetCacheData(
        'search',
        `/user-${userId}`,
        cachedHistory.cacheData.filter(
          (user: SimplifyUser) => user.userId !== data.userId
        )
      );
      queryClient.invalidateQueries({ queryKey: ['cachedHistory'] });
    }
  });

  const { mutate: removeHistory } = useMutation({
    mutationFn: async (data: SimplifyUser) => {
      if (!userId) return;
      await useSetCacheData(
        'search',
        `/user-${userId}`,
        cachedHistory.cacheData.filter(
          (user: SimplifyUser) => user.keyword !== data.keyword
        )
      );
      queryClient.invalidateQueries({ queryKey: ['cachedHistory'] });
    }
  });

  return { mutate, reset, remove, mutateHistory, removeHistory };
};
