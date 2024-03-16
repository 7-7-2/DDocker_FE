import { styled } from 'styled-system/jsx';
import DailyTrendCard from '@/components/posts/trend/DailyTrendCard';
import { Flex } from '@/styles/layout';
import { CardSpacer } from '@/styles/styles';

const DailyTrendSlider = () => {
  return (
    <Container className={Flex}>
      <DailyTrendCard />
      <DailyTrendCard />
      <DailyTrendCard />
      <DailyTrendCard />
      <DailyTrendCard />
      <DailyTrendCard />
      <DailyTrendCard />
      <CardSpacer />
    </Container>
  );
};

const Container = styled.section`
  overflow-x: scroll;
  margin-right: -20px;
`;

export default DailyTrendSlider;
