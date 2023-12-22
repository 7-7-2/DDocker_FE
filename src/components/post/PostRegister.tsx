import { useRecoilState, useRecoilValue } from 'recoil';
import { Input } from '@/components/common/Input';
import CoffeeOptionSelection from '@/components/common/CoffeeOptionSelection';
import CoffeeMenuSelection from '@/components/home/CoffeeMenuSelection';
import RegisterLabel from '@/components/post/RegisterLabel';

import { BUTTON_TEXTS, INPUT_TEXTS, LABEL_TEXTS } from '@/constants/common';
import {
  inputNicknameState,
  registPostState,
  useInputState
} from '@/atoms/atoms';
import { useShowFooter } from '@/hooks/useShowFooter';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import Icon from '@/components/common/Icon';
import { Center, Flex } from '@/styles/layout';
import Button from '@/components/common/Button';
import { DefaultBtn } from '@/styles/styles';
import { useNavigateTo } from '@/hooks/useNavigateTo';

const PostRegister = () => {
  useShowFooter(false);
  const inputState = useRecoilValue(useInputState);
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);

  const newRegistData = {
    ...registInfo,
    title: inputState
  };

  const navigateToDetail = useNavigateTo('/Post/1');

  const clickRegisterBtn = () => {
    navigateToDetail;
    setRegistInfo(newRegistData);
  };

  return (
    <>
      <Container>
        <CoffeeMenuSelection />
        <CoffeeOptionSelection />
        <RegisterLabel label={LABEL_TEXTS.title} />
        <div className={MarginTop6}>
          <Input type={INPUT_TEXTS.type.title.typeName} />
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
      </Container>
      <Button
        text={BUTTON_TEXTS.regist}
        onTouchEnd={clickRegisterBtn}
        className={cx(DefaultBtn, BtnContainer)}
      />
    </>
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
  padding-bottom: 22px;
  overflow-x: visible;
  overflow-y: auto;
`;

const BtnContainer = css`
  position: sticky;
  bottom: 0;
`;

const PostRegisterContainer = styled.div`
  height: inherit;
`;

export default PostRegister;
