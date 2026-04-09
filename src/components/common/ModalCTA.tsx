import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';

import { Align, Between, Column, Flex } from '@/styles/layout';
import {
  BtnColorBorderWhite,
  BtnColorMain,
  DubbleShortBtn,
  Medium,
  Regular
} from '@/styles/styles';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const ModalCTA = ({
  buttonText,
  title,
  description,
  type,
  fn: handleActions
}: {
  buttonText: Array<string>;
  title: string;
  description: string;
  type?: string;
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
        text={buttonText[0]}
        onClick={handleActions}
        className={cx(BtnColorBorderWhite, DubbleShortBtn)}
      />
      <Button
        text={buttonText[1]}
        onClick={HandleOnclick}
        className={cx(BtnColorMain, DubbleShortBtn)}
      />
    </ConfirmContainer>
  );

  return (
    isModal && (
      <BackgroundLayer onClick={HandleOnclick}>
        <ModalContainer className={cx(Column, Between, Align)}>
          <TextContainer className={cx(Column, Align)}>
            <Text className={Medium}>{title}</Text>
            <Description className={Regular}>{description}</Description>
          </TextContainer>
          {confirmDeleteAuth}
        </ModalContainer>
      </BackgroundLayer>
    )
  );
};

const ModalContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 198px;
  margin: auto;
  background-color: #ffffff;
  padding: 30px 16px 16px 16px;
  border-radius: 16px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const TextContainer = styled.div`
  gap: 6px;
`;

const Description = styled.div`
  font-size: var(--font-sizes-sm);
  line-height: 22px;
  color: var(--colors-mid-grey);
  text-align: center;
  white-space: pre-wrap;
`;

const Text = styled.div`
  font-size: var(--font-sizes-lg);
  white-space: pre-line;
  text-align: center;
`;

const ConfirmContainer = styled.div`
  width: 100%;
  gap: 8px;
`;

export default ModalCTA;
