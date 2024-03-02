import { useEffect, useState } from 'react';
import useGetCacheData from '@/hooks/useGetCacheData';
import { CoffeeInfo } from '@/types/types';

function useGetTodayCoffeeData() {
  const [coffeeInfo, setCoffeeInfo] = useState<CoffeeInfo>();
  const getDataList = async () => {
    const data = await useGetCacheData('user', '/coffee');
    setCoffeeInfo(data.cacheData);
  };

  useEffect(() => {
    getDataList();
  }, []);

  return coffeeInfo;
}

export default useGetTodayCoffeeData;
