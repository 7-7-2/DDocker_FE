import { useState } from 'react';

export const useImgErrorCTA = () => {
  const [url, setUrl] = useState('');
  const [isError, setIsError] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [reloadPhoto, setReloadPhoto] = useState('');

  const handleRefreshBtn = () => {
    setIsRefresh(true);
    setIsError(false);
  };

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
    isRefresh,
    reloadPhoto,
    setUrl,
    handleImgError,
    handleReloadImg,
    handleRefreshBtn
  };
};
