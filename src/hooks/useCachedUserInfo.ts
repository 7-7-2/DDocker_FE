import { useQuery } from '@tanstack/react-query';
import useGetCacheData from '@/hooks/useGetCacheData';
import { AuthTypes } from '@/types/types';

export const useCachedUserInfo = () => {
  const { data: accessToken } = useQuery({
    queryKey: ['accessToken'],
    queryFn: () => useGetCacheData('user', '/accessToken')
  });
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', accessToken],
    queryFn: () => useGetCacheData('user', '/userInfo'),
    enabled: !!accessToken
  });
  const userId = userInfo && userInfo.cacheData.data.userId;
  const userData: AuthTypes = userInfo && userInfo.cacheData.data;

  return { accessToken, userId, userData };
};
