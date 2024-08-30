import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getWeeklyPopular } from '@/api/post';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';
import { WeeklyPopularListTypes, WeeklyPopularTypes } from '@/types/types';

const useGetPopularList = () => {
  const currentDate = dayjs().format('D');
  const [brandList, setBrandList] = useState<WeeklyPopularTypes[]>([]);

  const { data: newPopularList, mutate } = useMutation({
    mutationFn: async () => {
      const data = await getWeeklyPopular();
      return data;
    }
  });

  const updatePopularList = async (newPopularList: WeeklyPopularListTypes) => {
    setBrandList(newPopularList[currentDate]);
    await useSetCacheData('brand', '/WeeklyPopular', newPopularList);
  };

  const getWeeklyPopularList = async () => {
    const cachedPopularList = await useGetCacheData('brand', '/WeeklyPopular');
    if (!cachedPopularList) {
      !newPopularList && mutate();
      newPopularList && (await updatePopularList(newPopularList));
      return;
    } else {
      const cachedDate =
        cachedPopularList.cacheData &&
        Object.keys(cachedPopularList.cacheData)[0];

      if (cachedDate === currentDate) {
        setBrandList(cachedPopularList.cacheData[cachedDate]);
        return;
      } else {
        mutate();
        newPopularList && (await updatePopularList(newPopularList));
        return;
      }
    }
  };

  useEffect(() => {
    getWeeklyPopularList();
  }, [newPopularList]);

  return brandList;
};

export { useGetPopularList };
