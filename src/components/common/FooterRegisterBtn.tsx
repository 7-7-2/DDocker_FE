import { useRecoilState } from 'recoil';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';

import { BUTTON_TEXTS } from '@/constants/common';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { registerBtnActiveState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  BtnColorMain,
  BtnColorWhite,
  RegisterModalBtnTop,
  RegisterModalBtnBottom,
  Medium
} from '@/styles/styles';
import { Center, Flex } from '@/styles/layout';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';

const { coffeeRegister, postRegister } = BUTTON_TEXTS;
const FooterRegisterBtn = ({ icon }: { icon: string }) => {
  const [activeRegisterBtn, setActiveRegisterBtn] = useRecoilState(
    registerBtnActiveState
  );
  const { signedIn } = useGetSignedIn();
  const handleRegister = () => {
    setActiveRegisterBtn(!activeRegisterBtn);
  };

  const registerBtnColor = !activeRegisterBtn ? BtnColorMain : BtnColorWhite;
  const registerPost = useNavigateTo('/post/register');
  const registerCoffee = useNavigateTo('/post/register/caffeine');
  const guestUser = useNavigateTo('/start/1');

  return (
    <>
      {activeRegisterBtn && (
        <Background onClick={handleRegister}>
          <ModalContainer className={Center}>
            <Button
              text={coffeeRegister}
              onClick={signedIn ? registerCoffee : guestUser}
              className={cx(RegisterModalBtnTop, Medium)}>
              <Icon {...iconPropsGenerator(`coffeeRegister`)} />
            </Button>
            <Button
              text={postRegister}
              onClick={signedIn ? registerPost : guestUser}
              className={cx(RegisterModalBtnBottom, Medium)}>
              <Icon {...iconPropsGenerator(`postRegister`)} />
            </Button>
          </ModalContainer>
        </Background>
      )}
      <RegisterBtn
        className={cx(Flex, Center, registerBtnColor)}
        onClick={handleRegister}
        style={{
          transform: activeRegisterBtn ? 'rotate(90deg)' : 'rotate(0deg)',
          zIndex: activeRegisterBtn ? 'var(--z-index-action-btn)' : '1'
        }}>
        {activeRegisterBtn ? (
          <Icon {...iconPropsGenerator(`${icon}-active`, `20`)} />
        ) : (
          <Icon {...iconPropsGenerator(icon, '16')} />
        )}
      </RegisterBtn>
    </>
  );
};

const RegisterBtn = styled.div`
  height: 42px;
  width: 42px;
  margin-top: -2px;
  border-radius: 50px;
  transition:
    background-color 0.2s,
    transform 0.2s ease-in-out;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-index-background-layer);
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0 auto 22px;
`;

export default FooterRegisterBtn;
