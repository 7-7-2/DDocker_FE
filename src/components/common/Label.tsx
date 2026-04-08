import Icon from '@/components/common/Icon';
import { LABEL_TEXTS } from '@/constants/common';
import { LabelProps } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between } from '@/styles/layout';
import { HomeRegistContainer, InputByteCheck } from '@/styles/styles';

const { nickname, aboutMe, favBrand } = LABEL_TEXTS;

export const Label = ({
  inputValue,
  initValue,
  label,
  icon,
  message
}: LabelProps) => {
  const nicknameCheckIcon =
    label == nickname.label && message && message === nickname.message.approval;
  const aboutMeIcon =
    label === aboutMe.label && initValue && initValue !== inputValue;
  const favBrandIcon =
    label === favBrand &&
    ((initValue && initValue !== inputValue) || (!initValue && inputValue));
  const alretMessage =
    message && message !== nickname.message.approval
      ? ErrorMessage
      : DefaultMessage;

  return (
    <LabelContainer className={cx(Align, Between)}>
      <div className={Align}>
        <LabelText className={HomeRegistContainer}>{label}</LabelText>
        {icon && (
          <>
            {nicknameCheckIcon || aboutMeIcon || favBrandIcon ? (
              <Icon {...iconPropsGenerator('check-done', '18')} />
            ) : (
              <Icon {...iconPropsGenerator('check', '18')} />
            )}
          </>
        )}
      </div>
      {inputValue !== '' && (
        <span className={cx(alretMessage, InputByteCheck)}>{message}</span>
      )}
    </LabelContainer>
  );
};

export const LabelContainer = styled.div`
  font-family: Pretendard;
  font-style: normal;
  margin-bottom: 8px;
`;

export const LabelText = styled.span`
  margin-right: 2px;
`;

export const ErrorMessage = css`
  color: #f00;
`;

export const DefaultMessage = css`
  color: var(--colors-main);
`;
