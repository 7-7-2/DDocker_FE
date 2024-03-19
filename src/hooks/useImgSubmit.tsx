import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { imageState } from '@/atoms/atoms';
import {
  getUserDocRef,
  setStorageImg,
  getStorageImg,
  setProfileImg
} from '@/api/profile';
import useGetCacheData from '@/hooks/useGetCacheData';
import { CachedData } from '@/types/types';

export const useImgSubmit = () => {
  const [cachedData, setCachedData] = useState<CachedData>();
  const [imageUrl, setImageUrl] = useRecoilState(imageState);

  useEffect(() => {
    const getCachedUserInfo = async () => {
      const data = await useGetCacheData('user', '/userId');
      setCachedData(data);
    };
    getCachedUserInfo();
  }, []);

  const handleFormSubmit = async () => {
    if (!cachedData?.cacheData || !imageUrl) {
      return;
    }
    const userDocRef = await getUserDocRef();
    const filePath = `users/${cachedData.cacheData}/profileImage.jpg`;

    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const file = new File([blob], 'profileImage.jpg', {
      type: 'image/jpeg'
    });

    await setStorageImg(filePath, file);
    await getStorageImg(filePath);
    await setProfileImg(userDocRef, filePath);
  };

  return { handleFormSubmit, setImageUrl, imageUrl };
};
