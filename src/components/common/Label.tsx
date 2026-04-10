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
    message && message === nickname.message.approval
      ? ConfirmMessage
      : ErrorMessage;

  const defaultIconStyle = aboutMeIcon || favBrandIcon ? 'check-done' : 'check';
  const nicknameIconStyle = nicknameCheckIcon
    ? 'check-done'
    : !message
      ? 'check'
      : 'check-fail';

  return (
    <LabelContainer className={cx(Align, Between)}>
      <div className={Align}>
        <LabelText className={HomeRegistContainer}>{label}</LabelText>
        {icon && (
          <>
            {label != nickname.label ? (
              <Icon {...iconPropsGenerator(defaultIconStyle, '18')} />
            ) : (
              <Icon {...iconPropsGenerator(nicknameIconStyle, '18')} />
            )}
          </>
        )}
      </div>
      {inputValue !== '' && (
        <Message className={alretMessage}>{message}</Message>
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
export const Message = styled.span`
  font-size: var(--font-sizes-xs);
  line-height: 20px;
`;

export const ErrorMessage = css`
  color: #f00;
`;

export const ConfirmMessage = css`
  color: var(--colors-main);
`;
