import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TodayCoffeeInfoTypes } from '@/types/types';
import { getTodayCoffeeInfo } from '@/api/post';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useDeleteCacheData } from '@/hooks/useDeleteCacheData';

export const useGetTodayCoffeeData = () => {
  const [coffeeInfo, setCoffeeInfo] = useState<TodayCoffeeInfoTypes>();
  const { signedIn } = useGetSignedIn();
  const { userId } = useCachedUserInfo();
  const userUrl = userId && `/water/${userId}`;

  const { data: todayCoffeeData, refetch: updateTodayCoffeeData } = useQuery({
    queryKey: ['todayCoffeeData'],
    queryFn: () => getTodayCoffeeInfo(),
    enabled: !!signedIn
  });

  const getDataList = async (todayCoffeeData: TodayCoffeeInfoTypes) => {
    const data = await useGetCacheData('user', '/coffee');
    if (!data && todayCoffeeData) {
      useSetCacheData('user', '/coffee', todayCoffeeData);
      useDeleteCacheData('user', userUrl);
      setCoffeeInfo(todayCoffeeData);
      return;
    }
    if (
      data &&
      todayCoffeeData &&
      todayCoffeeData.allCount === data.cacheData.allCount
    ) {
      setCoffeeInfo(data.cacheData);
      return;
    }
    if (
      data &&
      todayCoffeeData &&
      todayCoffeeData.allCount !== data.cacheData.allCount
    ) {
      console.log('🫨');
      useSetCacheData('user', '/coffee', todayCoffeeData);
      useDeleteCacheData('user', userUrl);
      setCoffeeInfo(todayCoffeeData);
      return;
    }
  };

  useEffect(() => {
    getDataList(todayCoffeeData);
  }, [todayCoffeeData]);

  return { coffeeInfo, updateTodayCoffeeData };
};
