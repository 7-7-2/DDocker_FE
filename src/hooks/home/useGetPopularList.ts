import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import useGetCacheData from '@/hooks/useGetCacheData';
import { getWeeklyPopular } from '@/api/post';
import { WeeklyPopularTypes } from '@/types/types';

const useGetPopularList = () => {
  const [brandList, setBrandList] = useState<WeeklyPopularTypes[]>();

  function fetchOnMonday() {
    const currentTime = dayjs();
    const nextMonday = currentTime.day(1).startOf('day').add(1, 'week');
    const delay = nextMonday.diff(currentTime);

    setTimeout(() => {
      getWeeklyPopular();
      fetchOnMonday();
    }, delay);
  }

  const getWeeklyPopularList = async () => {
    try {
      const res = await useGetCacheData('brand', '/WeeklyPopular');
      if (res) {
        setBrandList(res.cacheData);
      } else {
        getWeeklyPopular();
        getWeeklyPopularList();
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchOnMonday();
    getWeeklyPopularList();
  }, []);

  return brandList;
};

export { useGetPopularList };
