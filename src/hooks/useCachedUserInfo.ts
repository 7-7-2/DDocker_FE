import { useQuery } from '@tanstack/react-query';
import useGetCacheData from '@/hooks/useGetCacheData';
import { AuthTypes } from '@/types/types';

export const useCachedUserInfo = () => {
  const { data: social } = useQuery({
    queryKey: ['social'],
    queryFn: () => useGetCacheData('user', '/social')
  });
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', social],
    queryFn: () => useGetCacheData('user', '/userInfo'),
    enabled: !!social
  });
  const userId = userInfo && userInfo.cacheData.data.userId;
  const userData: AuthTypes = userInfo && userInfo.cacheData.data;

  return { userId, userData };
};
