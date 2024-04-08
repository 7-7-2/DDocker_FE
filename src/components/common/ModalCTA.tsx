import React from 'react';
import { useRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { MODAL_CTA_TEXTS } from '@/constants/common';
import { isModalState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { Align, Between, Column } from '@/styles/layout';
import { Medium, RegistBtn } from '@/styles/styles';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const { signIn } = MODAL_CTA_TEXTS;

const ModalCTA = ({
  actionText,
  text,
  fn: handleActions
}: {
  actionText: string;
  text: string;
  fn: React.TouchEventHandler<HTMLButtonElement>;
}) => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const Handleonclick = () => {
    setIsModal(!isModal);
  };

  return (
    <BackgroundLayer onClick={Handleonclick}>
      <ModalContainer>
        <Container className={cx(Column, Between)}>
          <TextContainer className={cx(Column, Align)}>
            <Icon {...iconPropsGenerator('ddocker-modal', '60')} />
            <Text className={Medium}>{text}</Text>
          </TextContainer>
          <Button
            text={actionText}
            onTouchEnd={handleActions}
            className={RegistBtn}></Button>
        </Container>
        <SubBtn onTouchEnd={Handleonclick}>{signIn.subBtn}</SubBtn>
      </ModalContainer>
    </BackgroundLayer>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 248px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const Container = styled.div`
  position: absolute;
  width: 300px;
  height: 218px;
  padding: 16px;
  border-radius: 16px;
  background-color: #ffffff;
`;

const TextContainer = styled.div`
  gap: 2px;
`;

const Text = styled.div`
  font-size: var(--font-sizes-lg);
  white-space: pre-line;
  text-align: center;
`;

const SubBtn = styled.button`
  position: absolute;
  width: 300px;
  color: #fff;
  text-decoration: underline;
  bottom: 0;
  font-size: var(--font-sizes-sm);
`;

export default ModalCTA;
