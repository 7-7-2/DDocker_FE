import { useEffect, useState } from 'react';
import useGetCacheData from '@/hooks/useGetCacheData';
import { TodayCoffeeInfoTypes } from '@/types/types';

function useGetTodayCoffeeData() {
  const [coffeeInfo, setCoffeeInfo] = useState<TodayCoffeeInfoTypes>();
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
