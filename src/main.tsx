import ReactDOM from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache
} from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/pages/Router';
import './main.css';
import '/styled-system/styles.css';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error(`Something went wrong: ${error}`);
      console.error(`From queryKey: ${query.queryKey}`);
    }
  })
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </RecoilRoot>
  </QueryClientProvider>
);
