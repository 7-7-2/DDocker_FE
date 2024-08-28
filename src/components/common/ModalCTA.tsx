import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { MODAL_CTA_TEXTS } from '@/constants/common';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { Align, Between, Column, Flex } from '@/styles/layout';
import { Medium, RegistBtn } from '@/styles/styles';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const { signIn } = MODAL_CTA_TEXTS;

const ModalCTA = ({
  actionText,
  text,
  subBtnText,
  type,
  isConfirm,
  fn: handleActions
}: {
  actionText: string;
  text: string;
  type?: string;
  subBtnText?: string;
  isConfirm?: boolean;
  fn: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const { isModal, setIsModal } = useVerifyModalCTA();
  const navigate = useNavigate();

  const HandleOnclick = () => {
    if (type === 'register') {
      navigate('/');
    }
    isModal && setIsModal(!isModal);
  };

  const confirmDeleteAuth = (
    <ConfirmContainer className={cx(Flex, Between)}>
      <Button
        text={'돌아가기'}
        onClick={HandleOnclick}
        className={cx(RegistBtn, BackBtn)}
      />
      <Button
        text={'탈퇴하기'}
        onClick={handleActions}
        className={RegistBtn}
      />
    </ConfirmContainer>
  );

  const DefalutBtn = (
    <Button
      text={actionText}
      onClick={handleActions}
      className={RegistBtn}
    />
  );

  return (
    isModal && (
      <BackgroundLayer onClick={HandleOnclick}>
        <ModalContainer>
          <Container className={cx(Column, Between, Align)}>
            <TextContainer
              className={cx(
                Column,
                Align,
                !isConfirm ? OnelineText : undefined
              )}>
              <Icon {...iconPropsGenerator('ddocker-modal', '60')} />
              <Text className={Medium}>{text}</Text>
            </TextContainer>
            {!isConfirm ? DefalutBtn : confirmDeleteAuth}
          </Container>
          {!type && (
            <SubBtn onClick={HandleOnclick}>
              {subBtnText || signIn.subBtn}
            </SubBtn>
          )}
        </ModalContainer>
      </BackgroundLayer>
    )
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
  width: 300px;
  height: 216px;
  padding: 16px;
  border-radius: 16px;
  background-color: #ffffff;
`;

const TextContainer = styled.div`
  gap: 6px;
`;

const OnelineText = css`
  gap: 16px;
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

const ConfirmContainer = styled.div`
  width: 100%;
  gap: 8px;
`;

const BackBtn = css`
  color: var(--colors-mid-grey);
  background-color: #fff;
  border: 1px solid var(--colors-btn-grey);
`;

export default ModalCTA;
