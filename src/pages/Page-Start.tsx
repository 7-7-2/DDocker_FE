import { useRecoilValue } from 'recoil';
import SignIn from '@/components/start/SignIn';
import InitialForm from '@/components/start/InitialForm';
import { authState } from '@/atoms/atoms';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SelectFavBrand } from '@/components/start/SelectFavBrand';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useShowFooter } from '@/hooks/useShowFooter';

const allowedPages = ['1', '2', '3'];

const Start = () => {
  useShowFooter(false);
  const { initialized, signIn } = useRecoilValue(authState);
  const { id } = useParams();

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  const accessToken = getAccessToken();

  const notAllowedPages = id && !allowedPages.includes(id);
  const notSignUp = !accessToken && (id === '2' || '3');
  const goToStartPage = useNavigateTo('/start/1');

  useEffect(() => {
    notAllowedPages && goToStartPage();
    notSignUp && goToStartPage();
  }, [id]);

  return (
    <div>
      {!signIn && id === '1' && <SignIn />}
      {accessToken && id === '2' && !initialized && <InitialForm />}
      {accessToken && id === '3' && !initialized && <SelectFavBrand />}
    </div>
  );
};

export default Start;
