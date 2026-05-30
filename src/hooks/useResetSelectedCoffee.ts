import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { caffeineFilterState, caffeineIntakeState } from '@/atoms/atoms';

export const useResetSelectedCoffee = () => {
  const { pathname } = useLocation();
  const resetSelectedCoffeeState = useResetRecoilState(caffeineIntakeState);
  const resetCaffeineState = useResetRecoilState(caffeineFilterState);
  const homePage = pathname === '/';

  useEffect(() => {
    homePage && touchResetBtn();
  }, []);

  const touchResetBtn = () => {
    resetSelectedCoffeeState();
    resetCaffeineState();
  };

  return touchResetBtn;
};
