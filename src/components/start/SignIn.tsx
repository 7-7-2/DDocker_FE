import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithGoogle } from '@/api/firebase';
import { authState } from '@/atoms/atoms';
import { SIGININ_TEXTS } from '@/constants/start';
import { AuthTypes } from '@/types/types';
import { styled } from 'styled-system/jsx';
import { Column, Center, Justify } from '@/styles/layout';
import { ButtonFont, SignInBtn } from '@/styles/styles';
import { cx } from 'styled-system/css';

const SignIn = () => {
  const [userAuthState, setUserAuthState] = useRecoilState(authState);
  const { signInBtn } = SIGININ_TEXTS;
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      if (res) {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const userInfo: AuthTypes = {
          initialized: true,
          user: {
            userId: credential?.accessToken,
            email: res.user?.displayName,
            name: res.user?.email
          },
          signIn: true
        };
        setUserAuthState(userInfo);
      }
    } catch {
      (error: string) => {
        console.error(error);
      };
    }
  };

  const clickDoneBtn = () => {
    navigate('/');
  };

  return (
    <>
      {!userAuthState.signIn && (
        <div className={cx(Justify, Column)}>
          <AppLogoContainer>
            <AppLogo className={Center}>AppLogo</AppLogo>
          </AppLogoContainer>
          <SignInBtnContainer className={Column}>
            <KakaoBtn className={SignInBtn}>{signInBtn.kakao}</KakaoBtn>
            <GoogleBtn
              type="button"
              className={SignInBtn}
              onClick={handleSignIn}>
              {signInBtn.google}
            </GoogleBtn>
            <NoneBtn
              className={ButtonFont}
              onClick={clickDoneBtn}
              onTouchEnd={clickDoneBtn}>
              {signInBtn.none}
            </NoneBtn>
          </SignInBtnContainer>
        </div>
      )}
    </>
  );
};

export default SignIn;


`;
