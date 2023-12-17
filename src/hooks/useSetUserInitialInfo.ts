import { useSetRecoilState } from 'recoil';
import { authState } from '@/atoms/atoms';

const useSetUserInitialInfo = () => {
  const setInitialInfo = useSetRecoilState(authState);

  const setUserInitialInfo = (
    inputValue?: string,
    brand?: string,
    gender?: string
  ) => {
    setInitialInfo(prevAuthState => ({
      ...prevAuthState,
      user: {
        ...prevAuthState.user,
        nickname: inputValue,
        brand: brand,
        gender: gender
      }
    }));
  };
  return setUserInitialInfo;
};

export default useSetUserInitialInfo;
