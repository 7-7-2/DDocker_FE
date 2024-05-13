import { useState } from 'react';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useCloudStorage } from '@/hooks/useCloudStorage';

export const useImgErrorCTA = () => {
  const [url, setUrl] = useState('');
  const [isError, setIsError] = useState(false);
  const [reloadPhoto, setReloadPhoto] = useState('');
  const refresh = useNavigateTo('0');
  const { reloadStorage } = useCloudStorage();

  const handleImgError = () => {
    setIsError(true);
  };

  const handleReloadImg = async () => {
    if (url) {
      const parts = url.split('%2F');
      const reloadUrl = await reloadStorage(`post/${parts[2]}/${parts[3]}`);
      setReloadPhoto(reloadUrl);
      setIsError(false);
    }
  };

  return {
    isError,
    reloadPhoto,
    setUrl,
    refresh,
    handleImgError,
    handleReloadImg
  };
};
