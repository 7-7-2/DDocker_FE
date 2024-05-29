import { useEffect, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useCancelSignUp } from '@/hooks/start/useCancelSignUp';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';

const SignIn = lazy(() => import('../components/start/SignIn'));
const InitialForm = lazy(() => import('../components/start/InitialForm'));
const SelectFavBrand = lazy(() => import('../components/start/SelectFavBrand'));
const allowedPages = ['1', '2', '3'];

const Start = () => {
  useShowFooter(false);
  useCancelSignUp();
  const { accessToken, userData } = useCachedUserInfo();
  const { id } = useParams();

  const notAllowedPages = id && !allowedPages.includes(id);
  const notSignUp = !userData && (id === '2' || '3');
  const goToHomePage = useNavigateTo('/');
  const goToStartPage = useNavigateTo('/start/1');

  useEffect(() => {
    notAllowedPages && goToStartPage();
    notSignUp && goToStartPage();
    accessToken && userData && goToHomePage();
  }, []);

  return (
    <>
      <SEOMeta pageData={id === '1' ? SEO_DATA.start : SEO_DATA.signUp} />
      <div>
        {!accessToken && id === '1' && <SignIn />}
        {id === '2' && <InitialForm />}
        {id === '3' && <SelectFavBrand />}
      </div>
    </>
  );
};

export default Start;
