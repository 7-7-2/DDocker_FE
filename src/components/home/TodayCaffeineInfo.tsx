import TodayCaffeineText from '@/components/home/TodayCaffeineText';
import WaterPerCoffee from '@/components/home/WaterPerCoffee';
import { styled } from 'styled-system/jsx';

const TodayCaffeineInfo = () => {
  return (
    <Container>
      <TodayCaffeineText />
      <WaterPerCoffee />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
export default TodayCaffeineInfo;
