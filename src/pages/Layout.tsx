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
        {pathname !== '/Start/1' && <Header />}
        <Suspense fallback={<></>}>
          <Contents>
            <Outlet />
          </Contents>
        </Suspense>
        {footerState && <Footer />}
      </Container>
    </>
  );
};

const Container = styled.main`
  position: relative;
  max-width: 500px;
  min-width: 360px;
  height: 100%;
`;

const Contents = styled.section`
  height: calc(100vh - 46px - 52px);
  margin: 0 20px;
  overflow-y: scroll;
`;

export default Layout;
