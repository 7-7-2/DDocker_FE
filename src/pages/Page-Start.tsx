import { useRecoilValue } from 'recoil';
import SignIn from '@/components/start/SignIn';
import InitialForm from '@/components/start/InitialForm';
import { authState } from '@/atoms/atoms';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useParams } from 'react-router-dom';
import { SelectFavBrand } from '@/components/start/SelectFavBrand';

const Start = () => {
  useShowFooter(false);
  const { initialized, signIn } = useRecoilValue(authState);
  const { id } = useParams();
  return (
    <div>
      {!signIn && <SignIn />}
      {signIn && id === '2' && !initialized && <InitialForm />}
      {signIn && id === '3' && !initialized && <SelectFavBrand />}
    </div>
  );
};

export default Start;
