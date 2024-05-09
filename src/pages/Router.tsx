import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import Layout from '@/pages/Layout';
import { ROUTES } from '@/constants/routes';
import { LazyRouteType } from '@/types/types';

const LazyRoutes = ROUTES.map(route => {
  const routeConfig: { [key: string]: LazyRouteType } = {
    Home: { index: true, path: '' },
    Start: { index: false, path: 'start/:id' },
    Post: { index: false, path: 'post/:postId/:type?' },
    Profile: { index: false, path: 'profile/:userId' },
    Follow: { index: false, path: 'follow/:userId' },
    Report: { index: false, path: 'report/:postId' }
  };

  const { index, path } = routeConfig[route] || {
    index: false,
    path: route.toLowerCase()
  };
  const LazyComponent = React.lazy(() => import(`./Page-${route}.tsx`));

  return (
    <Route
      key={route}
      index={index}
      path={path}
      element={<LazyComponent />}
    />
  );
});

const ErrorComponent = React.lazy(() => import(`./Page-Error.tsx`));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={<ErrorComponent />}>
      {LazyRoutes}
    </Route>
  )
);
