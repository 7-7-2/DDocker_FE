import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { getMyInfo, getUserInfo } from '@/api/user';
import { registPostState, userInfoState } from '@/atoms/atoms';
import useGetCacheData from '@/hooks/useGetCacheData';

function useGetUserInfo(ProfileId?: string | number | undefined) {
  const setCachedUser = useSetRecoilState(userInfoState);
  const resetCachedUser = useResetRecoilState(userInfoState);
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);

  const setUserInfo = async () => {
    const data = await useGetCacheData('user', '/userInfo');
    const userId = data && data.cacheData.data.userId;
    const userData = data && data.cacheData.data;

    if (
      userId &&
      (userId !== ProfileId || (!userId && ProfileId)) &&
      ProfileId
    ) {
      const res = await getUserInfo(ProfileId);
      setCachedUser(res.data);
      return;
    }

    if (userId && userId !== ProfileId) {
      const res = await getMyInfo();
      res && setCachedUser(res.data);
      return;
    }
    userData && setCachedUser(userData);

    if (userId && registInfo.brand === '') {
      userData.brand && setRegistInfo({ ...registInfo, brand: userData.brand });
    }
  };

  useEffect(() => {
    resetCachedUser();
    setUserInfo();
  }, [ProfileId]);
}

export default useGetUserInfo;
