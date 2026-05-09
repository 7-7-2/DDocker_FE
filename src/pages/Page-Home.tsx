import { lazy, Suspense } from 'react';

import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { styled } from 'styled-system/jsx';
import { useShowFooter } from '@/hooks/useShowFooter';

const CaffeineFilter = lazy(() => import('../components/home/CaffeineFilter'));
const TodayCaffeineInfo = lazy(
  () => import('../components/home/TodayCaffeineInfo')
);
const BrandCategory = lazy(() => import('../components/home/BrandCategory'));
const WeeklyPopular = lazy(() => import('../components/home/WeeklyPopular'));
const HomeFooter = lazy(() => import('../components/home/HomeFooter'));

const Home = () => {
  useShowFooter(true);
  useGetUserInfo();
  useComposeHeader('logo', '', 'icons');

  return (
    <>
      <SEOMeta pageData={SEO_DATA.home} />
      <Container>
        <Suspense>
          <TodayCaffeineInfo />
        </Suspense>
        <Suspense>
          <BrandCategory />
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
`;

export default Home;
