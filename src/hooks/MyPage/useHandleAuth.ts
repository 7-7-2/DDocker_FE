import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { useDeleteCacheData } from '@/hooks/useDeleteCacheData';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { deleteUserAccount } from '@/api/user';
import { isModalState } from '@/atoms/atoms';
import { MYPAGE_TEXTS } from '@/constants/profile';

const { signOutUrls } = MYPAGE_TEXTS;

export const useHandleAuth = () => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const [isConfirm, setIsConfirm] = useState(false);
  const goToStart = useNavigateTo('/start/1');

  const handleSignOut = async () => {
    await useDeleteCacheData('user', signOutUrls);
    goToStart();
  };

  const handleConfirmBtn = () => {
    setIsConfirm(!isConfirm);
  };

  const handleDeleteAccount = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!isModal) {
      e.preventDefault();
      setIsModal(true);
      return;
    }

    if (isModal) {
      const deleteAccount = async () => {
        await deleteUserAccount();
        await handleSignOut();
      };

      deleteAccount();
      return;
    }
  };

  return {
    isModal,
    isConfirm,
    handleSignOut,
    handleDeleteAccount,
    handleConfirmBtn
  };
};
