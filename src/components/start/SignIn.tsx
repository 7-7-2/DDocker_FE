import { useRecoilState } from 'recoil';
import { GoogleAuthProvider } from 'firebase/auth';
import { getUserInfo, signInWithGoogle } from '@/api/user';
import Icon from '@/components/common/Icon';
import { SIGININ_TEXTS } from '@/constants/start';
import { AuthTypes } from '@/types/types';
import { authState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import useSetCacheData from '@/hooks/useSetCacheData';
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
import { StartBtn, NoneBtn, SignInBtn } from '@/styles/styles';

const { signInBtn, startText } = SIGININ_TEXTS;

const SignIn = () => {
  const [userInfo, setUserAuthState] = useRecoilState<AuthTypes>(authState);
  const navToSignUp = useNavigateTo('/start/2');
  const navToHome = useNavigateTo('/');

  const handleSignIn = async () => {
    try {
      //sign in
      const res = await signInWithGoogle();
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const accessToken = credential?.accessToken as string;
      await useSetCacheData('user', '/accessToken', accessToken);
      await useSetCacheData('user', '/userId', res.user.uid);

      // UserInfo 가져오는 로직
      const userData = (await getUserInfo()) as AuthTypes | undefined;
      // const data = await useGetCacheData('user', '/user');

      // 초기 프로필 미설정 &&
      if (!userData) {
        const userInfo: AuthTypes = {
          initialized: false,
          user: {
            userId: res.user.uid,
            email: res.user?.email,
            name: res.user?.displayName,
            nickname: '',
            brand: '',
            gender: '',
            profileUrl: res.user.photoURL
          },
          signIn: true
        };
        setUserAuthState({ ...userInfo });
      }
      // 프로필 설정 여부로 페이지 이동
      !userData?.initialized ? navToSignUp() : navToHome();
    } catch {
      (error: string) => {
        console.log(error);
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
        <div className={StartBtn}>
          {startText.first}
          <br />
          {startText.second}
        </div>
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
        <button
          className={NoneBtn}
          onClick={useNavigateTo('/')}
          onTouchEnd={useNavigateTo('/')}>
          {signInBtn.none}
        </button>
      </SignInBtnContainer>
    </Container>
  );
};

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

const IconContiner = styled.div`
  position: absolute;
  left: 15px;
`;

export default SignIn;
