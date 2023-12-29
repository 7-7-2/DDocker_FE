import { useLayoutEffect, useState, Suspense } from 'react';
import TodayCaffeineText from '@/components/home/TodayCaffeineText';
import WaterPerCoffee from '@/components/home/WaterPerCoffee';
import useGetCacheData from '@/hooks/useGetCacheData';
import { CachedData } from '@/types/types';
import { getTodayCoffeeInfo } from '@/api/post';
import { styled } from 'styled-system/jsx';

const TodayCaffeineInfo = () => {
  const [cachedData, setCachedData] = useState<CachedData>();

  const getCachedUserInfo = async () => {
    const data = await useGetCacheData('user', '/accessToken');
    setCachedData(data);
  };

  const accessToken = cachedData?.cacheData;

  useLayoutEffect(() => {
    const getData = async () => {
      await getCachedUserInfo();
      await getTodayCoffeeInfo();
    };
    getData();
  }, []);

  return (
    <Container>
      <Suspense>
        <TodayCaffeineText />
        <WaterPerCoffee accessToken={accessToken} />
      </Suspense>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
export default TodayCaffeineInfo;
