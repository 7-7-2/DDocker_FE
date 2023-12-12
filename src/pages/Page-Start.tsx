import { useRecoilValue } from 'recoil';
import SignIn from '@/components/start/SignIn';
import InitialForm from '@/components/start/InitialForm';
import { authState } from '@/atoms/atoms';
import { useShowFooter } from '@/hooks/useShowFooter';
const Start = () => {
  useShowFooter(false);
  const { initialized, signIn } = useRecoilValue(authState);

  return (
    <div>
      {!signIn && <SignIn />}
      {signIn && !initialized && <InitialForm />}
    </div>
  );
};

export default Start;
