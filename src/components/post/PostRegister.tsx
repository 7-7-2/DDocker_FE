import { useRecoilState } from 'recoil';
import { Input } from '@/components/common/Input';
import CoffeeOptionSelection from '@/components/common/CoffeeOptionSelection';
import CoffeeMenuSelection from '@/components/home/CoffeeMenuSelection';
import RegisterLabel from '@/components/post/RegisterLabel';

import { BUTTON_TEXTS, INPUT_TEXTS, LABEL_TEXTS } from '@/constants/common';
import { inputNicknameState } from '@/atoms/atoms';
import { useShowFooter } from '@/hooks/useShowFooter';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import Icon from '@/components/common/Icon';
import { Center, Flex } from '@/styles/layout';
import Button from '@/components/common/Button';
import { DefaultBtn } from '@/styles/styles';
import { useNavigateTo } from '@/hooks/useNavigateTo';

// CLOSE ICON + REGISTER BTN => useShowFooter(true) hook call required
const PostRegister = () => {
  useShowFooter(false);
  const [inputValue, setInputValue] = useRecoilState(inputNicknameState);

  const writeTitle = () => {
    setInputValue(inputValue);
  };

  return (
    <Container>
      <PostRegisterContainer>
        <CoffeeMenuSelection />
        <CoffeeOptionSelection />
        <RegisterLabel label={LABEL_TEXTS.title} />
        <div className={MarginTop6}>
          <Input
            type={INPUT_TEXTS.type.title.typeName}
            handleEvent={writeTitle}
          />
        </div>
        <RegisterLabel
          label={LABEL_TEXTS.photo}
          essential
        />
        <div className={MarginTop6}>
          <RegistPhoto className={cx(Flex, Center)}>
            <Icon {...iconPropsGenerator('regist-photo', '24')} />
          </RegistPhoto>
        </div>
      </PostRegisterContainer>
      <Button
        text={BUTTON_TEXTS.regist}
        onTouchEnd={useNavigateTo('/Post/1')}
        className={cx(DefaultBtn, BtnContainer)}
      />
    </Container>
  );
};

const MarginTop6 = css`
  margin-top: 6px;
`;

const RegistPhoto = styled.button`
  width: 106px;
  height: 106px;
  border-radius: 10px;
  background: var(--colors-tertiary);
`;

const Container = styled.div`
  height: calc(100vh - 106px);
  overflow-x: visible;
  overflow-y: auto;
`;

const BtnContainer = css`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;
const PostRegisterContainer = styled.div`
  height: calc(100vh + 4vh);
`;

export default PostRegister;
