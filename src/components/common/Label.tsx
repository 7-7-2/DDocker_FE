import Icon from '@/components/common/Icon';
import { ICON_CHECK } from '@/constants/icons';
import { LABEL_TEXTS } from '@/constants/common';
import { LabelProps } from '@/types/types';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between } from '@/styles/layout';

export const Label = ({ inputValue, isAlert, label, message }: LabelProps) => {
  const { nickname } = LABEL_TEXTS;

  const nicknameCheckIcon = (
    <Icon
      {...ICON_CHECK}
      fill={isAlert && message === nickname.message ? '#FF701E' : '#CCC'}
    />
  );

  const alretMessage = (
    <LabelMessage
      className={message === nickname.error ? ErrorMessage : DefaltMessage}>
      {message}
    </LabelMessage>
  );

  return (
    <LabelContainer className={cx(Align, Between)}>
      <div className={Align}>
        <LabelText>{label}</LabelText>
        {label === nickname.label && nicknameCheckIcon}
      </div>
      {isAlert && inputValue && alretMessage}
    </LabelContainer>
  );
};

export const LabelContainer = styled.div`
  font-family: Pretendard;
  font-style: normal;
`;

export const LabelText = styled.div`
  color: #313131;
  margin-right: 4px;
  font-size: var(--font-sizes-base);
  font-weight: 500;
  line-height: 24px;
`;

export const LabelMessage = styled.span`
  font-size: var(--font-sizes-xs);
  font-weight: 400;
  line-height: 20px;
`;

export const ErrorMessage = css`
  color: #f00;
`;

export const DefaltMessage = css`
  color: var(--colors-main);
`;
