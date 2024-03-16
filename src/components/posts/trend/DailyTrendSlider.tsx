import { styled } from 'styled-system/jsx';
import DailyTrendCard from '@/components/posts/trend/DailyTrendCard';
import { Flex } from '@/styles/layout';
import { LeftCardSpacer, RightCardSpacer } from '@/styles/styles';

const DailyTrendSlider = () => {
  return (
    <Container className={Flex}>
      <LeftCardSpacer />
      <DailyTrendCard />
      <DailyTrendCard />
      <DailyTrendCard />
      <DailyTrendCard />
      <DailyTrendCard />
      <DailyTrendCard />
      <DailyTrendCard />
      <RightCardSpacer />
    </Container>
  );
};

const Container = styled.section`
  overflow-x: scroll;
  margin-left: -20px;
  margin-right: -20px;
`;

export default DailyTrendSlider;
