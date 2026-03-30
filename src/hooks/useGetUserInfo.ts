import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { getMyInfo, getUserInfo } from '@/api/user';
import { caffeineIntakeState, userInfoState } from '@/atoms/atoms';
import useGetCacheData from '@/hooks/useGetCacheData';

function useGetUserInfo(profileId?: string | number | undefined) {
  const setCachedUser = useSetRecoilState(userInfoState);
  const resetCachedUser = useResetRecoilState(userInfoState);
  const [caffeineIntake, setCaffeineIntake] =
    useRecoilState(caffeineIntakeState);

  const setUserInfo = async () => {
    const data = await useGetCacheData('user', '/userInfo');
    const userId = data && data.cacheData.data.userId;
    const userData = data && data.cacheData.data;

    if (userId && caffeineIntake.brand === '') {
      userData.brand &&
        setCaffeineIntake({ ...caffeineIntake, brand: userData.brand });
    }

    if (!userId && profileId) {
      const res = await getUserInfo(profileId);
      setCachedUser(res.data);
      return;
    }

    if (
      userId &&
      (userId !== profileId || (!userId && profileId)) &&
      profileId
    ) {
      const res = await getUserInfo(profileId);
      setCachedUser(res.data);
      return;
    }

    if (userId && userId !== profileId) {
      const res = await getMyInfo();
      res && setCachedUser(res.data);
      return;
    }

    return userData && setCachedUser(userData);
  };

  useEffect(() => {
    resetCachedUser();
    setUserInfo();
  }, [profileId]);
}

export default useGetUserInfo;
