import { useRecoilState } from 'recoil';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithGoogle } from '@/api/firebase';

import Icon from '@/components/common/Icon';
import { SIGININ_TEXTS } from '@/constants/start';
import { AuthTypes } from '@/types/types';
import { authState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useNavigateTo } from '@/hooks/useNavigateTo';

import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import {
  Column,
  Center,
  Justify,
  FlexCenter,
  Flex,
  MarginAuto
} from '@/styles/layout';
import { Btn, SignInBtn } from '@/styles/styles';

const { signInBtn, startText } = SIGININ_TEXTS;

const SignIn = () => {
  const [userAuthState, setUserAuthState] =
    useRecoilState<AuthTypes>(authState);

  const navToSignUp = useNavigateTo('/start/2');
  const navToHome = useNavigateTo('/');

  const saveAccessToken = (accessToken: string | undefined) => {
    accessToken && localStorage.setItem('accessToken', accessToken);
  };

  const handleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      if (res.operationType === 'signIn') {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const userInfo: AuthTypes = {
          initialized: false,
          user: {
            userId: credential?.accessToken,
            email: res.user?.displayName,
            name: res.user?.email,
            nickname: '',
            brand: '',
            gender: ''
          },
          signIn: true
        };
        setUserAuthState({ ...userInfo });
        saveAccessToken(credential?.accessToken);
        {
          !userAuthState.initialized ? navToSignUp() : navToHome();
        }
      }
    } catch {
      (error: string) => {
        console.error(error);
      };
    }
  };

  return (
    <Container>
      <AppLogoContainer
        className={cx(Flex, Justify, Column, Center, MarginAuto)}>
        <AppLogo className={FlexCenter}>
          <svg
            width={'115'}
            height={'154'}>
            <use href={`/sprite.svg#icon-ddocker-logo`} />
          </svg>
        </AppLogo>
        <StartText className={Btn}>
          {startText.first}
          <br />
          {startText.second}
        </StartText>
      </AppLogoContainer>
      <SignInBtnContainer className={cx(Justify, Column)}>
        <KakaoBtn className={SignInBtn}>
          <IconContiner>
            <Icon {...iconPropsGenerator('kakao', '18')} />
          </IconContiner>
          {signInBtn.kakao}
        </KakaoBtn>
        <GoogleBtn
          type="button"
          className={cx(SignInBtn, FlexCenter)}
          onClick={handleSignIn}>
          <IconContiner>
            <Icon {...iconPropsGenerator('google', '18')} />
          </IconContiner>
          <div>{signInBtn.google}</div>
        </GoogleBtn>
        <NoneBtn
          type="button"
          className={Btn}
          onClick={useNavigateTo('/')}
          onTouchEnd={useNavigateTo('/')}>
          {signInBtn.none}
        </NoneBtn>
      </SignInBtnContainer>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  align-items: space-between;
`;

const AppLogoContainer = styled.div`
  align-items: space-between;
  height: 62vh;
  padding-bottom: 24px;
`;

const AppLogo = styled.div`
  min-height: 300px;
  margin: auto 0;
`;

const SignInBtnContainer = styled.div`
  margin: auto 0 35px 0;
`;

const KakaoBtn = styled.button`
  background-color: #fee500;
`;

const GoogleBtn = styled.button`
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
  margin-top: 13px;
`;

const NoneBtn = styled.button`
  font-size: var(--font-sizes-sm);
  color: #767676;
  line-height: 18px;
  margin-top: 13px;
`;

const IconContiner = styled.div`
  position: absolute;
  left: 15px;
`;

const StartText = styled.div`
  text-align: center;
  font-size: var(--font-sizes-sm);
`;
