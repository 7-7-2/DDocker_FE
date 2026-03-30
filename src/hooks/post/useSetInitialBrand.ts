import { useRecoilState } from 'recoil';
import { brandState } from '@/atoms/atoms';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { brandMapToKor } from '@/utils/convertBrandName';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useSetInitialBrand = () => {
  const [selected, setSelected] = useRecoilState(brandState);
  const signedIn = useGetSignedIn();
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => useGetCacheData('user', '/userInfo'),
    enabled: !!signedIn
  });

  useEffect(() => {
    userInfo && setSelected(brandMapToKor(userInfo.cacheData.data.brand));
  }, [userInfo]);

  return { selected, setSelected };
};
