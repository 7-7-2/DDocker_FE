import useGetCacheData from '@/hooks/useGetCacheData';
import { AuthTypes } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

export const useCachedUserInfo = () => {
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => useGetCacheData('user', '/userInfo')
  });
  const userId = userInfo && userInfo.cacheData.data.userId;
  const userData: AuthTypes = userInfo && userInfo.cacheData.data;

  return { userId, userData };
};
