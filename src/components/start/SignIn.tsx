import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Icon from '@/components/common/Icon';
import { SIGININ_TEXTS } from '@/constants/start';
import { getSocialAuth, getAccessToken, getUserInfo } from '@/api/user';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import useGetCacheData from '@/hooks/useGetCacheData';

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
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navToSignUp = useNavigateTo('/start/2');
  const navToHome = useNavigateTo('/');

  const handleSocialAuth: React.TouchEventHandler<HTMLButtonElement> = async (
    e: React.TouchEvent<HTMLButtonElement>
  ) => {
    try {
      const social = e.currentTarget.value;
      await getSocialAuth(social);
    } catch (error) {
      console.log(error);
    }
  };

  const cacheAccessToken = async () => {
    try {
      const res = await useGetCacheData('user', '/social');
      await getAccessToken(code, res.cacheData);
      await getUserInfo();
      const initialized = await useGetCacheData('user', '/userInfo');
      (await initialized.cacheData.data) !== true ? navToHome() : navToSignUp();
    } catch (err) {
      console.log('Need to Social Sign In');
    }
  };

  useEffect(() => {
    cacheAccessToken();
  }, []);

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
        <KakaoBtn
          value="kakao"
          className={SignInBtn}
          onTouchEnd={handleSocialAuth}>
          <IconContiner>
            <Icon {...iconPropsGenerator('kakao', '18')} />
          </IconContiner>
          {signInBtn.kakao}
        </KakaoBtn>
        <GoogleBtn
          value="google"
          className={cx(SignInBtn, FlexCenter)}
          onTouchEnd={handleSocialAuth}>
          <IconContiner>
            <Icon {...iconPropsGenerator('google', '18')} />
          </IconContiner>
          <div>{signInBtn.google}</div>
        </GoogleBtn>
        <button
          className={NoneBtn}
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
