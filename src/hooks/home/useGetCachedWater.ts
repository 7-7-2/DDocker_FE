import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import useGetCacheData from '@/hooks/useGetCacheData';
import { takedWaterState } from '@/atoms/atoms';

const useGetCachedWater = (userUrl: string) => {
  const setTakedWater = useSetRecoilState(takedWaterState);

  const useGetCachedWater = async () => {
    const res = await useGetCacheData('user', userUrl);
    res && setTakedWater(res.cacheData);
  };

  useEffect(() => {
    useGetCachedWater();
  }, []);
};

export default useGetCachedWater;
