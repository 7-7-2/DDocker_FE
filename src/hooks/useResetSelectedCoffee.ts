import { useResetRecoilState } from 'recoil';
import { caffeineFilterState, registPostState } from '@/atoms/atoms';

export const useResetSelectedCoffee = () => {
  const resetstate = useResetRecoilState(registPostState);
  const resetCaffeineState = useResetRecoilState(caffeineFilterState);

  const touchResetBtn = () => {
    resetstate();
    resetCaffeineState();
  };

  return touchResetBtn;
};
