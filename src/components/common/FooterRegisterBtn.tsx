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
  BtnColorSub,
  RegisterModalBtn,
  RegisterModalBtnBubble
} from '@/styles/styles';
import { Center, Flex } from '@/styles/layout';

const FooterRegisterBtn = ({ icon }: { icon: string }) => {
  const [activeRegisterBtn, setActiveRegisterBtn] = useRecoilState(
    registerBtnActiveState
  );
  const { coffeeRegister, postRegister } = BUTTON_TEXTS;
  const handleRegister = () => {
    setActiveRegisterBtn(!activeRegisterBtn);
  };

  const registerBtnColor = !activeRegisterBtn ? BtnColorMain : BtnColorSub;
  const registerPost = useNavigateTo('/post/register');
  const registerCoffee = useNavigateTo('/post/register/coffee');

  return (
    <>
      {activeRegisterBtn && (
        <Background onClick={handleRegister}>
          <ModalContainer className={Center}>
            <Button
              text={coffeeRegister}
              onClick={registerCoffee}
              className={cx(RegisterModalBtn)}>
              <Icon {...iconPropsGenerator(`coffeeRegister`)} />
            </Button>
            <Button
              text={postRegister}
              onClick={registerPost}
              className={cx(RegisterModalBtn, RegisterModalBtnBubble)}>
              <Icon {...iconPropsGenerator(`postRegister`)} />
            </Button>
          </ModalContainer>
        </Background>
      )}
      <RegisterBtn
        className={cx(Flex, Center, registerBtnColor)}
        onClick={handleRegister}>
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
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 51px);
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto 20px;
  width: 184px;
`;

export default FooterRegisterBtn;
