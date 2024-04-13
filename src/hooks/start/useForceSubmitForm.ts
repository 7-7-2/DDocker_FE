import { useEffect } from 'react'; // Import useEffect hook
import useGetCacheData from '@/hooks/useGetCacheData';
import { useNavigateTo } from '@/hooks/useNavigateTo';

export const useForceSubmitForm = () => {
  const navToSignIn = useNavigateTo('/start/2');

  useEffect(() => {
    const validateFormRequired = async () => {
      const token = await useGetCacheData('user', '/accessToken');
      const userInfo = await useGetCacheData('user', '/userInfo');
      if (!token || !userInfo) return;

      const formRequired = userInfo.cacheData.data === true;

      if (token && formRequired) {
        navToSignIn();
      }
    };

    validateFormRequired();
  }, []);
};
