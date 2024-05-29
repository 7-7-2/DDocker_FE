import CaffeineFilter from '@/components/home/CaffeineFilter';
import HomeFooter from '@/components/home/HomeFooter';
import TodayCaffeineInfo from '@/components/home/TodayCaffeineInfo';
import WeeklyPopular from '@/components/home/WeeklyPopular';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { styled } from 'styled-system/jsx';

const Home = () => {
  useComposeHeader(true, '', 'icons');
  useGetUserInfo();

  return (
    <>
      <SEOMeta pageData={SEO_DATA.home} />
      <Container>
        <TodayCaffeineInfo />
        <CaffeineFilter />
        <WeeklyPopular />
      </Container>
      <HomeFooter />
    </>
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
    bottom: -48px;
    background-color: #f5f5f5;
    z-index: -1;
  }
`;

export default Home;
