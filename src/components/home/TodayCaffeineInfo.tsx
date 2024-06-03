import { lazy, Suspense } from 'react';
import { styled } from 'styled-system/jsx';

const TodayCaffeineText = lazy(
  () => import('@/components/home/TodayCaffeineText')
);
const WaterPerCoffee = lazy(() => import('@/components/home/WaterPerCoffee'));

const TodayCaffeineInfo = () => {
  return (
    <Container>
      <Suspense>
        <TodayCaffeineText />
      </Suspense>
      <Suspense>
        <WaterPerCoffee />
      </Suspense>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
export default TodayCaffeineInfo;
