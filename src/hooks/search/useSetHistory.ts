import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';

import { SimplifyUser } from '@/types/types';

export const useSetHistory = () => {
  const { userId } = useCachedUserInfo();
  const queryClient = useQueryClient();
  const { data: cachedHistory } = useQuery({
    queryKey: ['cachedHistory'],
    queryFn: () => useGetCacheData('search', `/user-${userId}`),
    enabled: !!userId
  });

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

  const { mutate: mutateSearchText } = useMutation({
    mutationFn: async (search: string) => {
      if (!userId) return;
      !cachedHistory &&
        (await useSetCacheData('search', `/user-${userId}`, [search]));
      if (cachedHistory) {
        const newDataExists = cachedHistory.cacheData.some(
          (item: string) => item === search
        );
        !newDataExists &&
          (await useSetCacheData('search', `/user-${userId}`, [
            ...cachedHistory.cacheData,
            search
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

  return {
    mutate,
    reset,
    remove,
    mutateSearchText,
    mutateHistory,
    removeHistory
  };
};
