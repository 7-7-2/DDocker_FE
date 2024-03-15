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
import ReactGA from 'react-ga4';

const { NODE_ENV } = import.meta.env;
const isPro = NODE_ENV === 'production';

if (isPro && import.meta.env.VITE_GA) {
  ReactGA.initialize(import.meta.env.VITE_GA);
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      console.error(`Something went wrong: ${error}`);
    }
  })
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </QueryClientProvider>
);
