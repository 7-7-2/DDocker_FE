import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithGoogle } from '@/api/firebase';
import Icon from '@/components/common/Icon';
import { authState } from '@/atoms/atoms';
import { SIGININ_TEXTS } from '@/constants/start';
import { AuthTypes } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { Column, Center, Justify, FlexCenter } from '@/styles/layout';
import { ButtonFont, SignInBtn } from '@/styles/styles';
import { cx } from 'styled-system/css';

const SignIn = () => {
  const [userAuthState, setUserAuthState] = useRecoilState(authState);
  const { signInBtn, startText } = SIGININ_TEXTS;
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      if (res) {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const userInfo: AuthTypes = {
          initialized: false,
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
            <StartText className={ButtonFont}>
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

const AppLogoContainer = styled.div`
  margin: 166px 0 24px;
`;

const AppLogo = styled.div`
  width: 161px;
  height: 161px;
  margin: auto;
  background-color: var(--colors-main);
  border-radius: 16px;
  text-align: center;
`;

const SignInBtnContainer = styled.div`
  gap: 12px;
  margin: auto;
`;

const KakaoBtn = styled.button`
  background-color: #fee500;
`;

const GoogleBtn = styled.button`
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
`;

const NoneBtn = styled.button`
  font-size: var(--font-sizes-sm);
  color: #767676;
  line-height: 18px;
`;

const IconContiner = styled.div`
  position: absolute;
  left: 15px;
`;

const StartText = styled.div`
  margin-top: 150px;
  text-align: center;
  font-size: var(--font-sizes-sm);
`;
