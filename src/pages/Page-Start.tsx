import { useRecoilValue } from 'recoil';
import SignIn from '@/components/start/SignIn';
import InitialForm from '@/components/start/InitialForm';
import { authState } from '@/atoms/atoms';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SelectFavBrand } from '@/components/start/SelectFavBrand';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useShowFooter } from '@/hooks/useShowFooter';
import useGetCacheData from '@/hooks/useGetCacheData';

const allowedPages = ['1', '2', '3'];

const Start = () => {
  useShowFooter(false);
  const { initialized, signIn } = useRecoilValue(authState);
  const [cachedData, setCachedData] = useState('');
  const { id } = useParams();

  // PWA
  const getCachedAccessToken = async () => {
    const data = await useGetCacheData('user', '/accessToken');
    setCachedData(data);
  };

  const notAllowedPages = id && !allowedPages.includes(id);
  const notSignUp = !cachedData && (id === '2' || '3');
  const goToStartPage = useNavigateTo('/start/1');

  useEffect(() => {
    notAllowedPages && goToStartPage();
    notSignUp && goToStartPage();
    getCachedAccessToken();
  }, [id]);

  return (
    <div>
      {!signIn && id === '1' && <SignIn />}
      {cachedData && id === '2' && !initialized && <InitialForm />}
      {cachedData && id === '3' && !initialized && <SelectFavBrand />}
    </div>
  );
};

export default Start;
