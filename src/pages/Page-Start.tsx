import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SignIn from '@/components/start/SignIn';
import InitialForm from '@/components/start/InitialForm';
import { SelectFavBrand } from '@/components/start/SelectFavBrand';

import { authState } from '@/atoms/atoms';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useShowFooter } from '@/hooks/useShowFooter';
import useGetCacheData from '@/hooks/useGetCacheData';
import { AuthTypes } from '@/types/types';

const allowedPages = ['1', '2', '3'];

const Start = () => {
  useShowFooter(false);
  const { initialized, signIn } = useRecoilValue<AuthTypes>(authState);
  const [accessToken, setAccessToken] = useState('');
  const { id } = useParams();

  const getCachedData = async () => {
    const getAccessToken = await useGetCacheData('user', '/accessToken');
    setAccessToken(getAccessToken);
  };

  const notAllowedPages = id && !allowedPages.includes(id);
  const notSignUp = !signIn && (id === '2' || '3');
  const goToHomePage = useNavigateTo('/');
  const goToStartPage = useNavigateTo('/start/1');

  useEffect(() => {
    getCachedData();
    notAllowedPages && goToStartPage();
    notSignUp && goToStartPage();
    accessToken && initialized && goToHomePage();
  }, [id]);

  return (
    <div>
      {!signIn && id === '1' && <SignIn />}
      {!initialized && id === '2' && <InitialForm />}
      {!initialized && id === '3' && <SelectFavBrand />}
    </div>
  );
};

export default Start;
