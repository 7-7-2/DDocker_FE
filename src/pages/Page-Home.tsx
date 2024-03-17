import CaffeineFilter from '@/components/home/CaffeineFilter';
import TodayCaffeineInfo from '@/components/home/TodayCaffeineInfo';
import WeeklyPopular from '@/components/home/WeeklyPopular';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { styled } from 'styled-system/jsx';

const Home = () => {
  useComposeHeader(true, '', 'icons');
  useGetUserInfo(0);

  return (
    <Container>
      <TodayCaffeineInfo />
      <CaffeineFilter />
      <WeeklyPopular />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: calc(100vh+ 126px);
  &:before {
    content: '';
    position: absolute;
    width: inherit;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background-color: #f5f5f5;
    z-index: -1;
  }
`;

export default Home;
