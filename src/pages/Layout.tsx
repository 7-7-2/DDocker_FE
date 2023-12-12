import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { styled } from 'styled-system/jsx';

const Layout = () => {
  return (
    <>
      <Container>
        <Suspense>
          <Outlet />
        </Suspense>
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
