import { useState } from 'react';
import { useNavigateTo } from '@/hooks/useNavigateTo';

export const useImgErrorCTA = () => {
  const [url, setUrl] = useState('');
  const [isError, setIsError] = useState(false);
  const [reloadPhoto, setReloadPhoto] = useState('');
  const refresh = useNavigateTo('0');

  const handleImgError = () => {
    setIsError(true);
  };

  const handleReloadImg = async () => {
    if (url) {
      setReloadPhoto(url);
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
