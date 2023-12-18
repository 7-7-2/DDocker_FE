import MyCoffeeSum from '@/components/coffee/MyCoffeeSum';
import { useComposeHeader } from '@/hooks/useComposeHeader';

const Coffee = () => {
  useComposeHeader(true, '', 'icons');
  return (
    <>
      <MyCoffeeSum />
    </>
  );
};

export default Coffee;
