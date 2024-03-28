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
    const res = await useGetCacheData('brand', '/WeeklyPopular');
    res ? setBrandList(res.cacheData) : getWeeklyPopular();
  };

  useEffect(() => {
    fetchOnMonday();
    getWeeklyPopularList();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchOnMonday, 1000 * 60 * 60 * 24);
    return () => clearInterval(intervalId);
  }, []);

  return brandList;
};

export { useGetPopularList };
