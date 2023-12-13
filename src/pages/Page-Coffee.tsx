import { useComposeHeader } from '@/hooks/useComposeHeader';

const Coffee = () => {
  useComposeHeader(true, '', 'icons');
  return <>Page-Coffee</>;
};

export default Coffee;
