import MyCoffeeSum from '@/components/coffee/MyCoffeeSum';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';

const Coffee = () => {
  useComposeHeader(true, '', 'icons');
  const { signedIn } = useGetSignedIn();

  return (
    <>
      <MyCoffeeSum signedIn={signedIn} />
    </>
  );
};

export default Coffee;
