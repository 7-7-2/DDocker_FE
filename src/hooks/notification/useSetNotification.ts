import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSetNotification = () => {
  const { userId } = useCachedUserInfo();
  const queryClient = useQueryClient();
  const { data: cachedNotification } = useQuery({
    queryKey: ['cachedNotification', userId],
    queryFn: () => useGetCacheData('notification', `/user-${userId}`),
    enabled: !!userId
  });

  const onInitialNotification = async (data: Notification[]) => {
    await useSetCacheData('notification', `/unread-${userId}`, true);
    await useSetCacheData('notification', `/user-${userId}`, data);
  };

  const onNotifications = async (data: Notification[]) => {
    await useSetCacheData('notification', `/unread-${userId}`, true);
    await useSetCacheData(
      'notification',
      `/user-${userId}`,
      [...cachedNotification.cacheData, ...data].slice(-100)
    );
  };
  const mutateCache = cachedNotification
    ? onNotifications
    : onInitialNotification;

  const { mutate } = useMutation({
    mutationFn: mutateCache,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['cachedNotification', userId]
      });
      await queryClient.invalidateQueries({ queryKey: ['unread', userId] });
    }
  });
  return { mutate };
};
