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
