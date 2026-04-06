import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { getMyInfo } from '@/api/user';

export const useVerifyMembership = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const socialToken = searchParams.get('socialToken');
  const socialEmail = searchParams.get('socialEmail');
  const type = searchParams.get('type');

  const navToHome = useNavigateTo('/');
  const navToSignUp = useNavigateTo('/start/2');

  const verifyMembership = async () => {
    // 1. Check if already logged in
    const cachedToken = await useGetCacheData('user', '/accessToken');
    if (cachedToken) return navToHome();

    // 2. Handle Login Flow from Backend
    if (type === 'login' && token) {
      await useSetCacheData('user', '/accessToken', token);
      await getMyInfo();
      return navToHome();
    }

    // 3. Handle Signup Flow from Backend
    if (type === 'signup' && socialToken && socialEmail) {
      await useSetCacheData('user', '/socialToken', socialToken);
      await useSetCacheData('user', '/socialEmail', socialEmail);
      await useSetCacheData('user', '/isRegistering', 'true');
      return navToSignUp();
    }
  };

  useEffect(() => {
    if (type) {
      verifyMembership();
    }
  }, [type, token, socialToken, socialEmail]);
};
