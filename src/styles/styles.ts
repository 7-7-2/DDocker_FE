import { css, cx } from 'styled-system/css';

export const ButtonFont = css`
  color: #202020;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
`;

export const SignInBtn = cx(
  ButtonFont,
  css`
    width: 335px;
    height: 54px;
    border-radius: 16px;
    font-size: var(--font-sizes-base);
    line-height: 20px;
  `
);
