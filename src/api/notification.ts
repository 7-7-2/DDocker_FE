import { authInstance } from './axiosInterceptor';
import { Notification } from '@/types/types';

export const markAllAsRead = async () => {
  const { data } = await authInstance.patch('/notification/read');
  return data;
};

export const getNotificationHistory = async (
  limit: number = 20,
  cursor?: string
): Promise<{
  items: Notification[];
  nextCursor?: string;
  lastReadAt: string;
}> => {
  const { data } = await authInstance.get('/notification', {
    params: { limit, cursor }
  });
  return data;
};
