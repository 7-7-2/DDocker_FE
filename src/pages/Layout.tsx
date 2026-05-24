import { Suspense, lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, Outlet } from 'react-router-dom';

import { footerShowState } from '@/atoms/atoms';
import { useFetchSSE } from '@/hooks/notification/useFetchSSE';

import { styled } from 'styled-system/jsx';
import {
  GeneralHeight,
  SearchPageHeight,
  StartPageHeight,
  RegisterPageHeight,
  PostPageHeight
} from '@/styles/styles';

const Header = lazy(() => import('../components/common/Header'));
const Footer = lazy(() => import('../components/common/Footer'));

let PagesHeight;

const Layout = () => {
  useFetchSSE();
  const { pathname } = useLocation();
  const footerState = useRecoilValue(footerShowState);
  const searchPredi = pathname.startsWith('/search');
  const startPredi = pathname.startsWith('/start');
  const reportPredi = pathname.startsWith('/report');
  const mypagePredi = pathname.endsWith('/mypage');
  const postPredi = pathname.startsWith('/post');
  const registerPredi =
    pathname.startsWith('/brand') ||
    pathname.startsWith('/post/register') ||
    pathname.endsWith('/update') ||
    pathname.endsWith('/caffeine');

  const getHeight = () => {
    if (searchPredi) {
      return (PagesHeight = SearchPageHeight);
    }
    if (registerPredi) {
      return (PagesHeight = RegisterPageHeight);
    }
    if (startPredi) {
      return (PagesHeight = StartPageHeight);
    }
    if (reportPredi || mypagePredi) {
      return (PagesHeight = RegisterPageHeight);
    }
    if (postPredi) {
      return (PagesHeight = PostPageHeight);
    }
    return (PagesHeight = GeneralHeight);
  };

  return (
    <>
      <Container>
        <Suspense>{!startPredi && !searchPredi && <Header />}</Suspense>
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
  height: 100vh;
`;

const Contents = styled.section`
  padding: 0 20px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default Layout;
