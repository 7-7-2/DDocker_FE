import { useEffect, useState } from 'react';
import { getCoffeeMenu } from '@/api/post';
import { setBrnadList } from '@/utils/setBrandList';
import useGetCacheData from '@/hooks/useGetCacheData';
import { CoffeeDataTypes } from '@/types/types';

function useGetCoffeeList(dataType?: string) {
  const [coffeeData, setCoffeeData] = useState<CoffeeDataTypes>();

  const getBrandList = async () => {
    const cachedData = await useGetCacheData('brand', '/coffeeMenu');
    if (!cachedData) {
      const res = await getCoffeeMenu();
      setCoffeeData(res);
    }

    cachedData && setCoffeeData(cachedData.cacheData);
  };

  useEffect(() => {
    getBrandList();
  }, []);

  const brandList = coffeeData && setBrnadList(coffeeData);
  return dataType === 'brand' ? brandList : coffeeData;
}

export default useGetCoffeeList;
