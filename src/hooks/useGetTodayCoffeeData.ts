import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useGetCacheData from '@/hooks/useGetCacheData';
import { TodayCoffeeInfoTypes } from '@/types/types';
import { getTodayCoffeeInfo } from '@/api/post';

function useGetTodayCoffeeData() {
  const [coffeeInfo, setCoffeeInfo] = useState<TodayCoffeeInfoTypes>();
  const { data: signedIn } = useQuery({
    queryKey: ['signedIn'],
    queryFn: () => useGetCacheData('user', '/accessToken')
  });
  function resetOnMidnight() {
    const currentTime = dayjs();
    const nextMidnight = dayjs().endOf('day').add(1, 'second');
    const delay = nextMidnight.diff(currentTime);

    const deleteCachedData = async (cacheName: string, url: string) => {
      const cacheStorage = await caches.open(cacheName);
      await cacheStorage.delete(url);
    };

    setTimeout(() => {
      resetOnMidnight();
      deleteCachedData('user', '/coffee');
      deleteCachedData('user', '/water');
    }, delay);
  }
  const getDataList = async () => {
    const data = await useGetCacheData('user', '/coffee');
    data && setCoffeeInfo(data.cacheData);
    if (!data) {
      signedIn && getTodayCoffeeInfo();
    }
  };

  useEffect(() => {
    getDataList();
    resetOnMidnight();
  }, []);

  return coffeeInfo;
}

export default useGetTodayCoffeeData;
