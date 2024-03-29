import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { styled } from 'styled-system/jsx';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { footerShowState } from '@/atoms/atoms';
import {
  GeneralHeight,
  SearchPageHeight,
  StartPageHeight
} from '@/styles/styles';
import useTrackRoute from '@/hooks/google/useTrackRoute';

const Header = lazy(() => import('../components/common/Header'));
const Footer = lazy(() => import('../components/common/Footer'));

let PagesHeight;

const { NODE_ENV } = import.meta.env;
const isPro = NODE_ENV === 'production';

const Layout = () => {
  isPro && useTrackRoute();
  const { pathname } = useLocation();
  const footerState = useRecoilValue(footerShowState);
  const searchPredi = pathname !== '/search';
  const startPredi = pathname !== '/start/1';
  const registerPredi = pathname === '/post/register';

  const getHeight = () => {
    if (registerPredi) {
      return (PagesHeight = SearchPageHeight);
    }
    if (searchPredi) {
      return (PagesHeight = GeneralHeight);
    }
    if (startPredi) {
      return (PagesHeight = SearchPageHeight);
    }
    return (PagesHeight = StartPageHeight);
  };

  return (
    <>
      <Container>
        <Suspense>{startPredi && searchPredi && <Header />}</Suspense>
        <Suspense fallback={<div className={getHeight()}></div>}>
          <Contents className={getHeight()}>
            <Outlet />
          </Contents>
        </Suspense>
        <Suspense>{footerState && <Footer />}</Suspense>
      </Container>
    </>
  );
};

const Container = styled.main`
  position: relative;
  max-width: 500px;
  min-width: 360px;
  width: 100vw;
  height: 100%;
`;

const Contents = styled.section`
  padding: 0 20px;
  overflow-y: scroll;
`;

export default Layout;
