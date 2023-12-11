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
  max-width: 500px;
`;

export default Layout;
