import { lazy, Suspense } from 'react';

import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { styled } from 'styled-system/jsx';

const CaffeineFilter = lazy(() => import('../components/home/CaffeineFilter'));
const TodayCaffeineInfo = lazy(
  () => import('../components/home/TodayCaffeineInfo')
);
const HomeFooter = lazy(() => import('../components/home/HomeFooter'));
const WeeklyPopular = lazy(() => import('../components/home/WeeklyPopular'));

const Home = () => {
  useComposeHeader(true, '', 'icons');
  useGetUserInfo();

  return (
    <>
      <SEOMeta pageData={SEO_DATA.home} />
      <Container>
        <Suspense>
          <TodayCaffeineInfo />
        </Suspense>
        <Suspense>
          <CaffeineFilter />
        </Suspense>
        <Suspense>
          <WeeklyPopular />
        </Suspense>
      </Container>
      <Suspense>
        <HomeFooter />
      </Suspense>
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
