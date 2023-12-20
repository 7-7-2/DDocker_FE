import Icon from '@/components/common/Icon';
import { LABEL_TEXTS } from '@/constants/common';
import { LabelProps } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between } from '@/styles/layout';

const { nickname, gender } = LABEL_TEXTS;

export const Label = ({ inputValue, isAlert, label, message }: LabelProps) => {
  const nicknameCheckIcon =
    isAlert && message === nickname.message.approval ? (
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
    <LabelMessage
      className={
        message && message === nickname.message.disapproval
          ? ErrorMessage
          : DefaltMessage
      }>
      {message}
    </LabelMessage>
  );

  return (
    <LabelContainer className={cx(Align, Between)}>
      <div className={Align}>
        <LabelText>{label}</LabelText>
        {label === nickname.label && nicknameCheckIcon}
        {label === gender.label && genderCheckIcon}
      </div>
      {isAlert && inputValue && alretMessage}
    </LabelContainer>
  );
};

export const LabelContainer = styled.div`
  font-family: Pretendard;
  font-style: normal;
  margin-bottom: 9px;
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
