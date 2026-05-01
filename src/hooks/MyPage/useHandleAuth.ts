import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';

import { useDeleteCacheData } from '@/hooks/useDeleteCacheData';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { deleteUserAccount, getSocialAuth, signOut } from '@/api/user';
import { isModalState } from '@/atoms/atoms';
import { MYPAGE_TEXTS } from '@/constants/profile';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import useGetCacheData from '@/hooks/useGetCacheData';

const { signOutUrls } = MYPAGE_TEXTS;

export const useHandleAuth = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const goToStart = useNavigateTo('/start/1');
  const { userId } = useCachedUserInfo();

  const { deleteStorage, deleteFolder } = useCloudStorage();

  const handleSignOut = async () => {
    await signOut();
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

  const handleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isModal) {
      e.preventDefault();
      setIsModal(true);
      return;
    }
    if (isModal) {
      const getSocialToken = async () => {
        const social = await useGetCacheData('user', '/social');
        await getSocialAuth(social.cacheData, true);
      };
      getSocialToken();
      return;
    }
  };

  const deleteAccount = async (code: string) => {
    const social = await useGetCacheData('user', '/social');
    await deleteUserAccount(social.cacheData, code);
    await handleDeleteHistory();
    await deleteStorage('user/', userId);
    await deleteFolder('post/', userId);
    await handleSignOut();
  };

  useEffect(() => {
    code && deleteAccount(code);
  }, []);

  return {
    isModal,
    handleSignOut,
    handleDeleteAccount
  };
};
