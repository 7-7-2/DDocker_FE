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
  Regular,
  Semibold
} from '@/styles/styles';
import { css, cx } from 'styled-system/css';
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
  description?: string;
  type?: string;
  fn: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const { isModal, setIsModal } = useVerifyModalCTA();
  const navigate = useNavigate();
  const deleteAccount = type === 'retention';

  const handleCancle = () => {
    if (type === 'register') {
      navigate('/');
    }
    isModal && setIsModal(!isModal);
  };

  const confirmContainer = (
    <ConfirmContainer className={cx(Flex, Between)}>
      <Button
        text={buttonText[0]}
        onClick={deleteAccount ? handleActions : handleCancle}
        className={cx(BtnColorBorderWhite, DubbleShortBtn, BtnTextColor)}
      />
      <Button
        text={buttonText[1]}
        onClick={!deleteAccount ? handleActions : handleCancle}
        className={cx(BtnColorMain, DubbleShortBtn)}
      />
    </ConfirmContainer>
  );

  return (
    isModal && (
      <BackgroundLayer onClick={handleCancle}>
        <ModalContainer className={cx(Column, Between, Align)}>
          <TextContainer className={cx(Column, Align)}>
            <Text className={Semibold}>{title}</Text>
            <Description className={Regular}>{description}</Description>
          </TextContainer>
          {confirmContainer}
        </ModalContainer>
      </BackgroundLayer>
    )
  );
};

const ModalContainer = styled.div`
  position: absolute;
  width: 300px;
  height: fit-content;
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
  margin-top: 28px;
`;
const BtnTextColor = css`
  color: var(--colors-mid-grey) !important;
`;
export default ModalCTA;
