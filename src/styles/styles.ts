import { css, cx } from 'styled-system/css';

export const Regular = css`
  font-style: normal;
  font-weight: 400;
`;

export const Medium = css`
  font-style: normal;
  font-weight: 500;
`;
export const Semibold = css`
  font-style: normal;
  font-weight: 600;
`;
export const Bold = css`
  font-style: normal;
  font-weight: 700;
`;

export const ButtonFont = cx(
  Medium,
  css`
    color: #202020;
  `
);
export const SignInBtn = cx(
  ButtonFont,
  css`
    width: 335px;
    height: 54px;
    border-radius: 16px;
    font-size: var(--font-sizes-base);
    line-height: 20px;
    position: relative;
  `
);

export const InputFontSm = cx(
  Regular,
  css`
    font-size: var(--font-sizes-sm);
    line-height: 22px;
  `
);

export const InputFontBase = cx(
  ButtonFont,
  css`
    font-size: var(--font-sizes-base);
    line-height: 24px;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  `
);
