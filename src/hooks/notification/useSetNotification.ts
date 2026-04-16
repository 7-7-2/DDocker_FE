import { getNotificationHistory, markAllAsRead } from '@/api/notification';
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

  const checkUnreadNoti = async (res: any) => {
    const { data } = res;
    const hasUnread = data?.items.some((item: any) => !item.isRead);
    if (hasUnread) {
      await useSetCacheData('notification', `/unread-${userId}`, true);
    }

    await useSetCacheData('notification', `/user-${userId}`, data.items);

    await useSetCacheData(
      'notification',
      `/lastNotiRead-${userId}`,
      data.lastReadAt
    );
    await queryClient.invalidateQueries({
      queryKey: ['cachedNotification', userId]
    });
    await queryClient.invalidateQueries({ queryKey: ['unread', userId] });
  };

  const { mutate: getHistory } = useMutation({
    mutationFn: (limit: number) => getNotificationHistory(limit),
    onSuccess: checkUnreadNoti
  });

  const onInitialNotification = async (data: Notification[]) => {
    await useSetCacheData('notification', `/unread-${userId}`, true);
    await useSetCacheData('notification', `/user-${userId}`, data);
  };

  const {mutate: updateRead} = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: async data => {
      await useSetCacheData(
        'notification',
        `/lastNotiRead-${userId}`,
        data
      );
    }
  });

  const onNotifications = async (data: Notification[]) => {
    await useSetCacheData('notification', `/unread-${userId}`, true);
    await useSetCacheData(
      'notification',
      `/user-${userId}`,
      [...data, ...cachedNotification.cacheData].slice(-100)
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

  return { mutate, getHistory, updateRead };
};
