import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
const Layout = () => {
  return (
    <>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
