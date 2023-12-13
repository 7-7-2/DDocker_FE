import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { styled } from 'styled-system/jsx';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { footerShowState } from '@/atoms/atoms';

const Header = lazy(() => import('../components/common/Header'));
const Footer = lazy(() => import('../components/common/Footer'));

const Layout = () => {
  const { pathname } = useLocation();
  const footerState = useRecoilValue(footerShowState);
  return (
    <>
      <Container>
        {pathname !== '/start/0' && <Header />}
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
        {footerState && <Footer />}
      </Container>
    </>
  );
};

const Container = styled.main`
  position: relative;
  max-width: 500px;
  min-width: 375px;
  height: 100%;
`;

export default Layout;
