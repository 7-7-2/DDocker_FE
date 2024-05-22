import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { registPostState } from '@/atoms/atoms';
import { useResetSelectedCoffee } from '@/hooks/useResetSelectedCoffee';

export const useResetRegistInfo = () => {
  const { caffeine } = useRecoilValue(registPostState);
  const touchResetBtn = useResetSelectedCoffee();

  useEffect(() => {
    caffeine !== 0 && touchResetBtn();
  }, []);
};
