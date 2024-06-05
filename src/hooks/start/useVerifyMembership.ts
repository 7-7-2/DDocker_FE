import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { ddockerSignIn, getMyInfo } from '@/api/user';
import { ddockerSignInType } from '@/types/types';

export const useVerifyMembership = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navToHome = useNavigateTo('/');
  const navToSignUp = useNavigateTo('/start/2');

  const verifyMembership = async () => {
    const accessToken = await useGetCacheData('user', '/accessToken');
    if (accessToken) return navToHome();
    const social = await useGetCacheData('user', '/social');
    const res =
      !accessToken &&
      code &&
      social.cacheData &&
      (await ddockerSignIn(code, social.cacheData));
    if (res) {
      const { accessToken } = (await res) as ddockerSignInType;
      const singIn = async () => {
        (await getMyInfo()) && navToHome();
      };
      return accessToken ? await singIn() : navToSignUp();
    }
    accessToken && navToHome();
  };

  useEffect(() => {
    code && verifyMembership();
  }, []);
};
