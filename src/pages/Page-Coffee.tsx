import MyCoffeeSum from '@/components/coffee/MyCoffeeSum';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useQuery } from '@tanstack/react-query';

const Coffee = () => {
  useComposeHeader(true, '', 'icons');
  const { data: signedIn } = useQuery({
    queryKey: ['signedIn'],
    queryFn: () => useGetCacheData('user', '/accessToken')
  });

  return (
    <>
      <MyCoffeeSum signedIn={signedIn} />
    </>
  );
};

export default Coffee;
