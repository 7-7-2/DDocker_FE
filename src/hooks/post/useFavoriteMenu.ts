import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useDeleteCacheData } from '@/hooks/useDeleteCacheData';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';

import {
  deleteFavoriteMenu,
  getFavoriteMenu,
  setFavoriteMenu
} from '@/api/post';
import { FavoriteMenuTypes } from '@/types/types';
import { caffeineIntakeState } from '@/atoms/atoms';
import { TOAST_TEXT } from '@/constants/common';

const { style: toastStyle, text } = TOAST_TEXT;

export const useFavoriteMenu = () => {
  const { userId } = useCachedUserInfo();
  const caffeineIntake = useRecoilValue(caffeineIntakeState);

  const { setIsModal } = useVerifyModalCTA();
  const [isfailed, setIsFailed] = useState(false);

  // **즐겨찾는 메뉴 조회**
  const { refetch: getFavMenu, data: res } = useQuery({
    queryKey: ['getFavoriteMenu', userId],
    queryFn: async () => {
      const cachedRes = await useGetCacheData('user', '/favoriteMenu');
      if (cachedRes === null) {
        const newRes = !cachedRes && (await getFavoriteMenu());
        newRes && (await useSetCacheData('user', '/favoriteMenu', newRes));
        return newRes as FavoriteMenuTypes[];
      }
      const res: FavoriteMenuTypes[] = cachedRes.cacheData;
      return res;
    },
    enabled: !!userId
  });

  //**즐겨찾는 메뉴 등록**
  const { mutate: postFavMenu } = useMutation({
    mutationKey: ['setFavoriteMenu'],
    mutationFn: async () => {
      await setFavoriteMenu(caffeineIntake);
    },
    onSuccess: async () => {
      await useDeleteCacheData('user', '/favoriteMenu');
      setIsModal(false);
      toast.success(text.favMenu.sucess, toastStyle);
    },
    onError: () => {
      toast.error(text.favMenu.error, toastStyle);
    }
  });

  // 즐겨찾는 메뉴 최대치 초과
  const alretMaxFavoriteMenu = () => {
    setIsFailed(true);
    setIsModal(true);
  };

  // 즐겨찾기 최대치 초과 시 이동 (편집 페이지)
  const navigate = useNavigate();
  const moveFavoriteTab = () => {
    try {
      setIsModal(false);
      setIsFailed(false);
    } finally {
      navigate('/post/register', {
        state: 'favoriteMenu'
      });
    }
  };

  // 즐겨찾기 추가 버튼 클릭
  const handleOnClick = async () => {
    const cachedData = await useGetCacheData('user', '/favoriteMenu');
    if (cachedData === null) {
      await getFavMenu();
      const cachedData = await useGetCacheData('user', '/favoriteMenu');
      return cachedData.cacheData.length >= 3
        ? alretMaxFavoriteMenu()
        : postFavMenu();
    }
    if (cachedData.cacheData.length >= 3) {
      return alretMaxFavoriteMenu();
    }
    return postFavMenu();
  };

  // **즐겨찾는 메뉴 삭제**
  const { mutate: deleteFavMenu } = useMutation({
    mutationFn: async (itemId: number) => {
      await deleteFavoriteMenu(itemId);
    },
    onSuccess: async () => {
      await useDeleteCacheData('user', '/favoriteMenu');
      await getFavMenu();
    }
  });

  return {
    res,
    deleteFavMenu,
    isfailed,
    handleOnClick,
    moveFavoriteTab
  };
};
