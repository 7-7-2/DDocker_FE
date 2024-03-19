import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SignIn from '@/components/start/SignIn';
import InitialForm from '@/components/start/InitialForm';
import { SelectFavBrand } from '@/components/start/SelectFavBrand';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useShowFooter } from '@/hooks/useShowFooter';
import useGetCacheData from '@/hooks/useGetCacheData';

const allowedPages = ['1', '2', '3'];

const Start = () => {
  useShowFooter(false);
  const [accessToken, setAccessToken] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const { id } = useParams();

  const getCachedData = async () => {
    const getAccessToken = await useGetCacheData('user', '/accessToken');
    const getUserInfo = await useGetCacheData('user', '/userInfo');
    getAccessToken && setAccessToken(getAccessToken.cacheData);
    getUserInfo && setUserInfo(getUserInfo.cacheData);
  };

  const notAllowedPages = id && !allowedPages.includes(id);
  const notSignUp = !userInfo && (id === '2' || '3');
  const goToHomePage = useNavigateTo('/');
  const goToStartPage = useNavigateTo('/start/1');

  useEffect(() => {
    getCachedData();
    notAllowedPages && goToStartPage();
    notSignUp && goToStartPage();
    accessToken && userInfo && goToHomePage();
  }, []);

  return (
    <div>
      {!accessToken && id === '1' && <SignIn />}
      {id === '2' && <InitialForm />}
      {id === '3' && <SelectFavBrand />}
    </div>
  );
};

export default Start;
