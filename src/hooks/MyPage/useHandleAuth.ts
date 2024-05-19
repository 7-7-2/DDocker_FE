import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { useDeleteCacheData } from '@/hooks/useDeleteCacheData';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { deleteUserAccount } from '@/api/user';
import { isModalState } from '@/atoms/atoms';
import { MYPAGE_TEXTS } from '@/constants/profile';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';

const { signOutUrls } = MYPAGE_TEXTS;

export const useHandleAuth = () => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const [isConfirm, setIsConfirm] = useState(false);
  const goToStart = useNavigateTo('/start/1');
  const { userId } = useCachedUserInfo();

  const { deleteStorage, deleteFolder } = useCloudStorage();
  const userRoute = `user/${userId}`;
  const postRoute = `post/${userId}`;

  const handleSignOut = async () => {
    await useDeleteCacheData('user', signOutUrls);
    goToStart();
  };

  const handleDeleteHistory = async () => {
    await useDeleteCacheData(`search`, [`/user-${userId}`]);
    await useDeleteCacheData(`notification`, [
      `/user-${userId}`,
      `/unread-${userId}`
    ]);
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
        await handleDeleteHistory();
        await deleteUserAccount();
        await deleteStorage(userRoute);
        await deleteFolder(postRoute);
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
