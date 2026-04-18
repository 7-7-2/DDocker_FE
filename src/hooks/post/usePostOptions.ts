import { footerShowState } from '@/atoms/atoms';
import { useToggle } from '@/hooks/post/useToggle';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useRecoilState } from 'recoil';

export const usePostOptions = () => {
  const { toggle, handleToggle } = useToggle();
  const { isModal, setIsModal } = useVerifyModalCTA();
  const [footerState, setFooterState] = useRecoilState(footerShowState);

  const cancelOptions = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleToggle();
    setFooterState(!footerState);
  };

  const recoverFooterState = () => {
    setFooterState(true);
    isModal && setIsModal(!isModal);
  };

  const confirmDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    cancelOptions(e);
    setIsModal(true);
  };

  return {
    toggle,
    cancelOptions,
    handleToggle,
    confirmDelete,
    isModal,
    recoverFooterState
  };
};
