import { useEffect, useState } from 'react';
import TodayCaffeineText from '@/components/home/TodayCaffeineText';
import WaterPerCoffee from '@/components/home/WaterPerCoffee';
import useGetCacheData from '@/hooks/useGetCacheData';
import { CachedData, UserCachedData } from '@/types/types';

const TodayCaffeineInfo = () => {
  const [cachedData, setCachedData] = useState<CachedData>();

  const getCachedUserInfo = async () => {
    const data = await useGetCacheData('user', '/accessToken');
    setCachedData(data);
  };

  const accessToken = cachedData?.cacheData;

  useEffect(() => {
    getCachedUserInfo();
  }, []);

  return (
    <div>
      <TodayCaffeineText accessToken={accessToken} />
      <WaterPerCoffee accessToken={accessToken} />
    </div>
  );
};

export default TodayCaffeineInfo;
