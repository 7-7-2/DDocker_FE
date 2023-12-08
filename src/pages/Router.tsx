import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import Layout from '@/pages/Layout';
import { ROUTES } from '@/constants/routes';

const LazyRoutes = ROUTES.map(route => {
  const ifHome = route === 'Home';
  const LazyComponent = React.lazy(() => import(`./Page-${route}.tsx`));
  return (
    <Route
      key={route}
      index={ifHome}
      path={ifHome ? '' : route.toLocaleLowerCase()}
      element={<LazyComponent />}
    />
  );
});

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}>
      {LazyRoutes}
    </Route>
  )
);
