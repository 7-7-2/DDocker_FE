import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSetNotification = () => {
  const queryClient = useQueryClient();
  const { data: cachedNotification } = useQuery({
    queryKey: ['cachedNotification'],
    queryFn: () => useGetCacheData('notification', '/user')
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Notification) => {
      !cachedNotification &&
        (await useSetCacheData('notification', '/user', [data]));
      if (cachedNotification.cacheData.length < 100) {
        await useSetCacheData('notification', '/user', [
          ...cachedNotification.cacheData,
          data
        ]);
      }
      if (cachedNotification.cacheData.length >= 100) {
        await useSetCacheData(
          'notification',
          '/user',
          [...cachedNotification.cacheData, data].slice(-100)
        );
      }
      await useSetCacheData('notification', '/unread', true);
      queryClient.invalidateQueries({ queryKey: ['unread'] });
      return;
    }
  });
  return { mutate };
};
