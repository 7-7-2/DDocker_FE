import { useComposeHeader } from '@/hooks/useComposeHeader';

const Home = () => {
  useComposeHeader(true, '', 'icons');

  return <>HOME</>;
};

export default Home;
