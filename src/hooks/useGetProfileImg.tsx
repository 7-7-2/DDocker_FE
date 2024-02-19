import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getDoc } from 'firebase/firestore';
import { imageState } from '@/atoms/atoms';
import useGetCacheData from '@/hooks/useGetCacheData';
import { getUserDocRef } from '@/api/profile';

export const useGetProfileImg = () => {
  const [profileUrl, setProfileUrl] = useRecoilState(imageState);
  const userInfo = useGetCacheData('user', '/userInfo');

  useEffect(() => {
    const fetchProfileImg = async () => {
      if (!userInfo) {
        return;
      }
      const userDocRef = await getUserDocRef();
      try {
        const fetchedImg = await getDoc(userDocRef);
        if (!fetchedImg.exists())
          throw new Error('이미지가 존재하지 않습니다.');
        const userData = fetchedImg.data();
        const userProfileUrl = userData?.user?.profileUrl || '';
        setProfileUrl(userProfileUrl);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImg();
  }, [setProfileUrl]);
};
