import { useRecoilState } from 'recoil';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';

import { BUTTON_TEXTS } from '@/constants/common';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { registerBtnActiveState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { BtnColorMain, BtnColorWhite, RegisterModalBtnTop, RegisterModalBtnBottom } from '@/styles/styles';
import { Center, Flex } from '@/styles/layout';

const FooterRegisterBtn = ({ icon }: { icon: string }) => {
  const [activeRegisterBtn, setActiveRegisterBtn] = useRecoilState(
    registerBtnActiveState
  );
  const { coffeeRegister, postRegister } = BUTTON_TEXTS;
  const handleRegister = () => {
    setActiveRegisterBtn(!activeRegisterBtn);
  };

  const registerBtnColor = !activeRegisterBtn ? BtnColorMain : BtnColorWhite;
  const registerPost = useNavigateTo('/post/register');
  const registerCoffee = useNavigateTo('/post/register/caffeine');

  return (
    <>
      {activeRegisterBtn && (
        <Background onClick={handleRegister}>
          <ModalContainer className={Center}>
            <Button
              text={coffeeRegister}
              onClick={registerCoffee}
              className={cx(RegisterModalBtnTop)}>
              <Icon {...iconPropsGenerator(`coffeeRegister`)} />
            </Button>
            <Button
              text={postRegister}
              onClick={registerPost}
              className={cx(RegisterModalBtnBottom)}>
              <Icon {...iconPropsGenerator(`postRegister`)} />
            </Button>
          </ModalContainer>
        </Background>
      )}
      <RegisterBtn
        className={cx(Flex, Center, registerBtnColor)}
        onClick={handleRegister}
        style={{
          transform: activeRegisterBtn ? 'rotate(135deg)' : 'rotate(0deg)'
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
  z-index: 999;
  border-radius: 50px;
  transition: background-color 0.2s, transform 0.2s ease-in-out;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
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
