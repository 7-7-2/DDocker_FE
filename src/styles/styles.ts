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

// Button
export const Btn = cx(
  Medium,
  css`
    width: 100%;
  `
);

export const ThinBtn = css`
  border-radius: 10px;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

export const BtnColorMain = css`
  background: var(--colors-main);
  color: #fff;
`;

export const BtnColorWhite = css`
  border: 1px solid #ccc;
  background: #fff;
  color: #313131;
`;

export const SignInBtn = cx(
  Btn,
  css`
    height: 54px;
    border-radius: 16px;
    font-size: var(--font-sizes-base);
    line-height: 20px;
    position: relative;
    color: #202020;
  `
);

export const DefaultBtn = cx(
  Btn,
  BtnColorMain,
  css`
    height: 60px;
    border-radius: 16px;
    font-size: var(--font-sizes-base);
    line-height: 24px;
  `
);

export const RegistBtn = cx(
  Btn,
  ThinBtn,
  BtnColorMain,
  css`
    height: 46px;
  `
);

export const FollowBtn = cx(
  Btn,
  ThinBtn,
  BtnColorMain,
  css`
    height: 40px;
  `
);

export const FollowingBtn = cx(
  Btn,
  ThinBtn,
  BtnColorWhite,
  css`
    height: 40px;
  `
);

export const ShortBtn = cx(
  Medium,
  css`
    width: 80px;
    height: 30px;
    border-radius: 6px;
    font-size: var(--font-size-xs);
  `
);

export const FollowBtnSm = cx(BtnColorMain, ShortBtn);

export const FollowingBtnSm = cx(BtnColorWhite, ShortBtn);

export const LoginBtn = cx(
  Medium,
  BtnColorWhite,
  css`
    width: 120px;
    height: 40px;
    border-radius: 50px;
    color: #767676;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
  `
);

// Input
export const InputFontSm = cx(
  Regular,
  css`
    font-size: var(--font-sizes-sm);
    line-height: 22px;
  `
);

export const InputFontBase = cx(
  Btn,
  css`
    font-size: var(--font-sizes-base);
    line-height: 24px;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  `
);

export const StartPageContiner = css`
  height: calc(100vh - 106px);
  overflow-x: visible;
  overflow-y: auto;
`;
