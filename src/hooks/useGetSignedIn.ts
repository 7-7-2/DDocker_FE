import useGetCacheData from '@/hooks/useGetCacheData';
import { useQuery } from '@tanstack/react-query';

export const useGetSignedIn = () => {
  const { data: signedIn } = useQuery({
    queryKey: ['signedIn'],
    queryFn: () => useGetCacheData('user', '/accessToken')
  });
  return { signedIn };
};
