import { useEffect } from 'react';
import { getDoc } from 'firebase/firestore';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useRecoilState } from 'recoil';
import { imageState } from '@/atoms/atoms';
import { getUserDocRef } from '@/api/profile';

export const useGetProfileImg = () => {
  const [profileUrl, setProfileUrl] = useRecoilState(imageState);

  const userId = useGetCacheData('user', '/userId');

  useEffect(() => {
    const fetchProfileImg = async () => {
      if (!userId) {
        return;
      }
      const userDocRef = await getUserDocRef();
      try {
        const fetchedImg = await getDoc(userDocRef);
        if (fetchedImg.exists()) {
          const userData = fetchedImg.data();
          const userProfileUrl = userData?.user?.profileUrl || '';
          setProfileUrl(userProfileUrl);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImg();
  }, [setProfileUrl]);
};
