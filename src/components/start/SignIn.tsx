import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Icon from '@/components/common/Icon';
import { SIGININ_TEXTS } from '@/constants/start';
import { getSocialAuth, ddockerSignIn, getMyInfo } from '@/api/user';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import useGetCacheData from '@/hooks/useGetCacheData';
import { ddockerSignInType } from '@/types/types';

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
  const navToHome = useNavigateTo('/');
  const navToSignUp = useNavigateTo('/start/2');

  const handleSocialAuth: React.MouseEventHandler<HTMLButtonElement> = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      const social = e.currentTarget.value;
      await getSocialAuth(social);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyMembership = async () => {
    const social = await useGetCacheData('user', '/social');
    const accessToken = await useGetCacheData('user', '/accessToken');
    if (accessToken) return navToHome();
    const res =
      !accessToken &&
      code &&
      social &&
      (await ddockerSignIn(code, social.cacheData));
    if (res) {
      const { accessToken } = (await res) as ddockerSignInType;
      const singIn = async () => {
        (await getMyInfo()) && navToHome();
      };
      return accessToken ? await singIn() : navToSignUp();
    }
  };

  useEffect(() => {
    verifyMembership();
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
          onClick={handleSocialAuth}>
          <IconContiner>
            <Icon {...iconPropsGenerator('kakao', '18')} />
          </IconContiner>
          {signInBtn.kakao}
        </KakaoBtn>
        <GoogleBtn
          value="google"
          className={cx(SignInBtn, FlexCenter)}
          onClick={handleSocialAuth}>
          <IconContiner>
            <Icon {...iconPropsGenerator('google', '18')} />
          </IconContiner>
          <div>{signInBtn.google}</div>
        </GoogleBtn>
        <button
          className={NoneBtn}
          onClick={useNavigateTo('/')}>
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
