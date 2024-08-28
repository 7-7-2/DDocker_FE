import Icon from '@/components/common/Icon';
import { SIGININ_TEXTS } from '@/constants/start';
import { getSocialAuth } from '@/api/user';
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
import { StartBtn, NoneBtn, SignInBtn } from '@/styles/styles';
import { useMutation } from '@tanstack/react-query';

const { signInBtn, startText } = SIGININ_TEXTS;

const SignIn = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (social: string) => {
      await getSocialAuth(social);
    }
  });

  const handleSocialAuth: React.MouseEventHandler<HTMLButtonElement> = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const social = e.currentTarget.value;
    !isPending && (await mutateAsync(social));
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
