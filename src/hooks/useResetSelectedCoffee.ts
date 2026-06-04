import { useResetRecoilState } from 'recoil';
import { caffeineFilterState, caffeineIntakeState } from '@/atoms/atoms';

export const useResetSelectedCoffee = () => {
  const resetSelectedCoffeeState = useResetRecoilState(caffeineIntakeState);
  const resetCaffeineState = useResetRecoilState(caffeineFilterState);

  const touchResetBtn = () => {
    resetSelectedCoffeeState();
    resetCaffeineState();
  };

  return touchResetBtn;
};
