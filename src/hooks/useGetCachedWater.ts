import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import useGetCacheData from '@/hooks/useGetCacheData';
import { takedWaterState } from '@/atoms/atoms';

const useGetCachedWater = () => {
  const setTakedWater = useSetRecoilState(takedWaterState);

  const useGetCachedWater = async () => {
    const res = await useGetCacheData('user', '/water');
    res && setTakedWater(res.cacheData);
    return;
  };

  useEffect(() => {
    useGetCachedWater();
  }, []);
};

export default useGetCachedWater;
