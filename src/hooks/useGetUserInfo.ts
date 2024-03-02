import { registPostState, userInfoState } from '@/atoms/atoms';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

async function useGetUserInfo() {
  const setCachedUser = useSetRecoilState(userInfoState);
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);
  const setUserInfo = async () => {
    const data = await useGetCacheData('user', '/userInfo');
    setCachedUser(data.cacheData.data);
    if (registInfo.brand === '') {
      setRegistInfo({ ...registInfo, brand: data.cacheData.data.brand });
    }
  };

  useEffect(() => {
    setUserInfo();
  }, []);
}

export default useGetUserInfo;
