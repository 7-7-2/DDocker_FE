import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getWeeklyPopular } from '@/api/post';
import { WeeklyPopularTypes } from '@/types/types';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';

const useGetPopularList = () => {
  const [brandList, setBrandList] = useState<WeeklyPopularTypes[]>([]);

  const { data: weeklyPopularList } = useQuery({
    queryKey: ['weeklyPopularList'],
    queryFn: () => getWeeklyPopular(),
    staleTime: 1000 * 60 * 60 * 24
  });

  const getWeeklyPopularList = async () => {
    try {
      const res = await useGetCacheData('brand', '/WeeklyPopular');
      const cachedDate = res && Object.keys(res.cacheData)[0];
      const currentDate = dayjs().format('D');

      if (!res && weeklyPopularList) {
        setBrandList(weeklyPopularList[currentDate]);
        await useSetCacheData(
          'brand',
          '/WeeklyPopular',
          weeklyPopularList[currentDate]
        );
        return;
      }
      if (res && weeklyPopularList && cachedDate === currentDate) {
        setBrandList(res.cacheData[cachedDate]);
        return;
      }
      if (res && weeklyPopularList && cachedDate !== currentDate) {
        await useSetCacheData('brand', '/WeeklyPopular', weeklyPopularList);
        setBrandList(weeklyPopularList[currentDate]);
        return;
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    weeklyPopularList && getWeeklyPopularList();
  }, [weeklyPopularList]);

  return brandList;
};

export { useGetPopularList };
