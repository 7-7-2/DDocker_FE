import { footerShowState } from '@/atoms/atoms';
import { useToggle } from '@/hooks/useToggle';
import { useRecoilState } from 'recoil';

export const usePostOptions = () => {
  const { toggle, handleToggle } = useToggle();
  const [footerState, setFooterState] = useRecoilState(footerShowState);

  const handleOptions = () => {
    handleToggle();
    setFooterState(!footerState);
  };
  return { toggle, handleOptions };
};
