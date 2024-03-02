import { useEffect, useState } from 'react';
import { getCoffeeMenu } from '@/api/post';
import { setBrnadList } from '@/utils/setBrandList';
import useGetCacheData from '@/hooks/useGetCacheData';
import { CoffeeData } from '@/types/types';

function useGetCoffeeList(dataType?: string) {
  const [coffeeData, setCoffeeData] = useState<CoffeeData>();

  const getBrandList = async () => {
    const cachedData = await useGetCacheData('brand', '/coffeeMenu');
    if (!cachedData) {
      const res = await getCoffeeMenu();
      setCoffeeData(res);
    }

    setCoffeeData(cachedData.cacheData);
  };

  useEffect(() => {
    getBrandList();
  }, []);

  const brandList = coffeeData && setBrnadList(coffeeData);
  return dataType === 'brand' ? brandList : coffeeData;
}

export default useGetCoffeeList;
