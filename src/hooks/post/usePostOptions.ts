import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { footerShowState } from '@/atoms/atoms';
import { useToggle } from '@/hooks/post/useToggle';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';

export const usePostOptions = () => {
  const { toggle, handleToggle } = useToggle();
  const { isModal, setIsModal } = useVerifyModalCTA();
  const [isPostOption, setIsPostOption] = useState(false);
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
    setIsPostOption(true);
    setIsModal(true);
  };

  return {
    toggle,
    cancelOptions,
    handleToggle,
    confirmDelete,
    isModal,
    isPostOption,
    setIsPostOption,
    recoverFooterState
  };
};
