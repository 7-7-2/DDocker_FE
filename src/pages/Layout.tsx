import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { styled } from 'styled-system/jsx';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { footerShowState } from '@/atoms/atoms';
import {
  GeneralHeight,
  SearchPageHeight,
  StartPageHeight,
  RegisterPageHeight
} from '@/styles/styles';
import useTrackRoute from '@/hooks/google/useTrackRoute';
import { useForceSubmitForm } from '@/hooks/start/useForceSubmitForm';
import { useFetchSSE } from '@/hooks/notification/useFetchSSE';

const Header = lazy(() => import('../components/common/Header'));
const Footer = lazy(() => import('../components/common/Footer'));

let PagesHeight;

const { NODE_ENV } = import.meta.env;
const isPro = NODE_ENV === 'production';

const Layout = () => {
  useForceSubmitForm();
  useFetchSSE();

  isPro && useTrackRoute();
  const { pathname } = useLocation();
  const footerState = useRecoilValue(footerShowState);
  const searchPredi = pathname.startsWith('/search');
  const startPredi = pathname.startsWith('/start');
  const reportPredi = pathname.startsWith('/report');
  const registerPredi = pathname === '/post/register';

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
    if (reportPredi) {
      return (PagesHeight = RegisterPageHeight);
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
  height: 100%;
`;

const Contents = styled.section`
  padding: 0 20px;
  overflow-y: scroll;
`;

export default Layout;
