import Icon from '@/components/common/Icon';

import { LABEL_TEXTS } from '@/constants/common';
import { LabelProps } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between } from '@/styles/layout';
import { HomeRegistContainer } from '@/styles/styles';

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
    label === aboutMe.label && initValue
      ? initValue !== inputValue
      : inputValue;
  const favBrandIcon =
    label === favBrand && initValue && initValue !== inputValue;
  const favBrnadIconStyle = favBrandIcon ? 'check-done' : 'check';
  const aboutMeIconStyle = aboutMeIcon ? 'check-done' : 'check';
  const nicknameIconStyle = nicknameCheckIcon
    ? 'check-done'
    : message === undefined
      ? 'check'
      : 'check-fail';

  const alretMessage =
    message && message === nickname.message.approval
      ? ConfirmMessage
      : ErrorMessage;

  return (
    <LabelContainer className={cx(Align, Between)}>
      <div className={Align}>
        <LabelText className={HomeRegistContainer}>{label}</LabelText>
        {icon && (
          <>
            {label === nickname.label ? (
              <Icon {...iconPropsGenerator(nicknameIconStyle, '18')} />
            ) : label === favBrand ? (
              <Icon {...iconPropsGenerator(favBrnadIconStyle, '18')} />
            ) : (
              <Icon {...iconPropsGenerator(aboutMeIconStyle, '18')} />
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
