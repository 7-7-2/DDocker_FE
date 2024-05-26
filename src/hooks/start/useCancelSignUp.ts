import { useEffect } from 'react';
import { useDeleteCacheData } from '@/hooks/useDeleteCacheData';
import useGetCacheData from '@/hooks/useGetCacheData';
import { unlinkSocialauth } from '@/api/user';

export const useCancelSignUp = async () => {
  const handleUnloadOrPopstate = async (event: BeforeUnloadEvent) => {
    const social = await useGetCacheData('user', '/social');
    const socialToken = await useGetCacheData('user', '/socialToken');
    const isRegistering = await useGetCacheData('user', '/isRegistering');
    if (isRegistering) {
      await useDeleteCacheData('user', [
        '/social',
        '/socialToken',
        '/socialEmail',
        '/isRegistering'
      ]);
      await unlinkSocialauth(social.cacheData, socialToken.cacheData);
    }
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnloadOrPopstate);
    return () => {
      window.removeEventListener('beforeunload', handleUnloadOrPopstate);
    };
  }, []);
};
