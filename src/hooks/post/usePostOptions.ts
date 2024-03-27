import { footerShowState } from '@/atoms/atoms';
import { useToggle } from '@/hooks/post/useToggle';
import { useRecoilState } from 'recoil';

export const usePostOptions = () => {
  const { toggle, handleToggle } = useToggle();
  const [footerState, setFooterState] = useRecoilState(footerShowState);

  const cancelOptions = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleToggle();
    setFooterState(!footerState);
  };

  const cancelConfirm = <T extends HTMLElement>(
    e: React.MouseEvent<T, MouseEvent>
  ) => {
    e.preventDefault();
    handleToggle();
    setFooterState(true);
  };
  return { toggle, cancelOptions, cancelConfirm, handleToggle };
};
