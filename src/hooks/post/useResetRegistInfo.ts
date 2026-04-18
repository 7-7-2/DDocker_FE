import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { postContentsState } from '@/atoms/atoms';
import { useResetSelectedCoffee } from '@/hooks/useResetSelectedCoffee';

export const useResetRegistInfo = () => {
  const resetSelectedCoffee = useResetSelectedCoffee();
  const resetPostContentsState = useResetRecoilState(postContentsState);

  const resetRegistInfo = () => {
    resetSelectedCoffee();
    resetPostContentsState();
  };
  return { resetRegistInfo };
};
