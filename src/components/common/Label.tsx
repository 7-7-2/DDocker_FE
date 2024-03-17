import Icon from '@/components/common/Icon';
import { LABEL_TEXTS } from '@/constants/common';
import { LabelProps } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between } from '@/styles/layout';
import { HomeRegistContainer, InputByteCheck } from '@/styles/styles';

const { nickname, gender } = LABEL_TEXTS;

export const Label = ({ inputValue, label, message }: LabelProps) => {
  const nicknameCheckIcon =
    inputValue && message === nickname.message.approval ? (
      <Icon {...iconPropsGenerator('check-done', '14')} />
    ) : (
      <Icon {...iconPropsGenerator('check', '14')} />
    );

  const genderCheckIcon =
    inputValue?.length !== 0 ? (
      <Icon {...iconPropsGenerator('check-done', '14')} />
    ) : (
      <Icon {...iconPropsGenerator('check', '14')} />
    );

  const alretMessage = (
    <span
      className={cx(
        message && message !== nickname.message.approval
          ? ErrorMessage
          : DefaltMessage,
        InputByteCheck
      )}>
      {message}
    </span>
  );

  return (
    <LabelContainer className={cx(Align, Between)}>
      <div className={Align}>
        <LabelText className={HomeRegistContainer}>{label}</LabelText>
        {label === nickname.label && nicknameCheckIcon}
        {label === gender.label && genderCheckIcon}
      </div>
      {inputValue !== '' && alretMessage}
    </LabelContainer>
  );
};

export const LabelContainer = styled.div`
  font-family: Pretendard;
  font-style: normal;
  margin-bottom: 9px;
`;

export const LabelText = styled.div`
  margin-right: 4px;
`;

export const ErrorMessage = css`
  color: #f00;
`;

export const DefaltMessage = css`
  color: var(--colors-main);
`;
