import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { getUserInfo } from '@/api/user';
import { registPostState, userInfoState } from '@/atoms/atoms';
import useGetCacheData from '@/hooks/useGetCacheData';

function useGetUserInfo(userId?: string | number | undefined) {
  const setCachedUser = useSetRecoilState(userInfoState);
  const resetCachedUser = useResetRecoilState(userInfoState);
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);

  const setUserInfo = async () => {
    const data = await useGetCacheData('user', '/userInfo');
    if (
      ((data && data.cacheData.data.userId !== userId) || data === null) &&
      userId
    ) {
      const res = await getUserInfo(userId);
      setCachedUser(res.data);
      return;
    }

    data && setCachedUser(data.cacheData.data);

    if (registInfo.brand === '') {
      data &&
        setRegistInfo({ ...registInfo, brand: data.cacheData.data.brand });
    }
  };

  useEffect(() => {
    resetCachedUser();
    setUserInfo();
  }, [userId]);
}

export default useGetUserInfo;
