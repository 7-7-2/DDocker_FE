import { useResetRecoilState } from 'recoil';
import { caffeineFilterState, registPostState } from '@/atoms/atoms';

function useResetSelectedCoffee() {
  const resetstate = useResetRecoilState(registPostState);
  const resetCaffeineState = useResetRecoilState(caffeineFilterState);

  const touchResetBtn = () => {
    resetstate();
    resetCaffeineState();
  };
  return touchResetBtn;
}

export default useResetSelectedCoffee;
