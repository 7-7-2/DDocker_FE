import useGetCacheData from '@/hooks/useGetCacheData';
import { useQuery } from '@tanstack/react-query';

export const useVerifyOwner = (postNum: string) => {
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', postNum],
    queryFn: () => useGetCacheData('user', '/userInfo')
  });

  const { data: postOwner } = useQuery({
    queryKey: ['postOwner', postNum],
    queryFn: async () => {
      return await userInfo.cacheData.data.nickname;
    },
    enabled: !!userInfo
  });
  return { postOwner };
};
