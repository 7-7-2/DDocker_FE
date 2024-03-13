import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

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

export const StartBtn = cx(
  Btn,
  css`
    color: #313131;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
    text-align: center;
  `
);

export const NoneBtn = cx(
  Btn,
  css`
    font-size: var(--font-sizes-sm);
    color: #767676;
    line-height: 18px;
    margin-top: 13px;
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
export const DisabledBtn = css`
  background: #ccc;
  color: #fff;
`;

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

export const SizeBtn = cx(
  LoginBtn,
  css`
    width: 106px;
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

export const InputByteCheck = cx(
  Regular,
  css`
    color: #313131;
    font-size: var(--font-sizes-xs);
    line-height: 20px;
  `
);

export const Cafe = css`
  color: #767676;
  font-size: var(--font-sizes-xs);
  line-height: 20px;
`;

export const CafeMedium = cx(Medium, Cafe);

export const BgF5 = css`
  background-color: #f5f5f5;
`;

export const PaddingL12 = css`
  padding-left: 12px;
`;

export const PaddingL63 = css`
  padding-left: 63px;
`;

export const PaddingL24 = css`
  padding-left: 24px;
`;

export const PaddingT12 = css`
  padding-top: 12px;
`;

export const PaddingT20 = css`
  padding-top: 20px;
`;

export const PaddingT22 = css`
  padding-top: 22px;
`;

export const PaddingB20 = css`
  padding-bottom: 20px;
`;

export const PaddingTBMix = cx(PaddingT12, PaddingB20);

export const MarginT12 = css`
  margin-top: 12px;
`;

export const MarginT16 = css`
  margin-top: 16px;
`;

export const MarginT17 = css`
  margin-top: 17px;
`;

export const MarginT28 = css`
  margin-top: 28px;
`;

export const MarginB6 = css`
  margin-bottom: 6px;
`;

export const MarginB8 = css`
  margin-bottom: 8px;
`;

export const PostsCafe = css`
  color: #313131;
  font-size: var(--font-sizes-sm);
  font-weight: 600;
  line-height: 22px;
`;

export const PostContainer = css`
  padding: 12px 0;
`;

export const PostsContainer = css`
  padding: 12px 0 0;
`;

export const PostContent = styled.div`
  font-size: var(--font-sizes-sm);
  line-height: 22px;
  padding-bottom: 16px;
`;

export const CaffeineDetail = cx(
  Regular,
  css`
    color: #313131;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
  `
);

export const SearchInput = cx(
  Regular,
  css`
    color: #a6a6a6;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
    background-color: transparent;
  `
);
export const StartPageContainer = css`
  height: calc(100vh - 162px);
  overflow-x: visible;
  overflow-y: auto;
`;

export const Cursor = css`
  cursor: pointer;
`;

export const LineH18 = css`
  line-height: 18px;
`;

export const TextBlack = css`
  color: #313131;
`;

export const TextGray = css`
  color: #767676;
`;

export const Border16 = css`
  border-radius: 16px;
`;

export const TextArea = cx(
  Regular,
  css`
    color: #fff;
    font-size: var(--font-sizes-xs);
    line-height: 20px;
  `
);

export const ButtonArea = cx(
  Medium,
  css`
    width: auto;
    height: 40px;
    padding: 9px 35px;
    margin-top: 16px;
    background-color: red;
    border: 1px solid #ccc;
    border-radius: 50px;
    background: #fff;
  `
);

export const ToggleButton = css`
  width: 100%;
  height: 40px;
  cursor: pointer;
  position: relative;
  font-weight: 500;
  &.active {
    position: relative;
    font-weight: 600;
    color: var(--colors-main);
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: calc(100% + 20px);
    }
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: calc(100% + 20px);
  }
`;

export const ToggleLeft = css`
  &.active {
    &::after {
      left: -20px;
      border-bottom: 2px solid var(--colors-main);
    }
  }
  &::after {
    border-bottom: 1px solid #767676;
    left: -20px;
  }
`;
export const ToggleRight = css`
  &.active {
    &::after {
      right: -20px;
      border-bottom: 2px solid var(--colors-main);
    }
  }
  &::after {
    border-bottom: 1px solid #767676;
    right: -20px;
  }
`;

export const PaddingTB10 = css`
  padding: 10px 0;
`;

export const SearchBtn = cx(
  Regular,
  css`
    color: #313131;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
  `
);

export const RecentSearch = cx(
  Semibold,
  css`
    font-size: var(--font-sizes-base);
    color: #313131;
    line-height: 24px;
  `
);

export const DeleteAllBtn = cx(
  Semibold,
  css`
    font-size: var(--font-sizes-xs);
    color: #767676;
    line-height: 20px;
  `
);

export const DelBtn = cx(
  Medium,
  css`
    color: #313131;
    font-size: var(--font-sizes-xs);
    line-height: 20px;
  `
);

export const SearchPageHeight = css`
  height: calc(
    100dvh - 52px - env(safe-area-inset-bottom) - env(safe-area-inset-top)
  );
`;

export const GeneralHeight = css`
  height: calc(
    100dvh - 46px - 52px - env(safe-area-inset-bottom) - env(
        safe-area-inset-top
      )
  );
`;

export const StartPageHeight = css`
  height: calc(100dvh - env(safe-area-inset-bottom) - env(safe-area-inset-top));
`;

export const SumTitle = cx(
  Semibold,
  css`
    color: #313131;
    font-size: var(--font-sizes-lg);
    line-height: 26px;
  `
);

export const SumBoardTitle = cx(
  Medium,
  css`
    color: #313131;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
  `
);

export const SumType = cx(
  Regular,
  css`
    color: #767676;
    font-size: var(--font-sizes-xs);
    line-height: 20px;
  `
);

export const SumTypeAmount = cx(
  Bold,
  css`
    color: var(--colors-main);
    font-size: var(--font-sizes-xl);
    line-height: 28px;
  `
);

export const SumTypeUnit = cx(
  Medium,
  css`
    color: #313131;
    font-size: var(--font-sizes-sm);
    line-height: 28px;
    transform: translateY(7%);
  `
);

export const HomeRegistContainer = cx(
  Medium,
  css`
    color: #313131;
    font-size: var(--font-sizes-base);
    line-height: 24px;
  `
);

export const HomeInfoCaffeine = cx(
  Semibold,
  css`
    color: var(--colors-main);
    font-size: var(--font-sizes-xl);
    line-height: 28px;
  `
);

export const SmStyle = cx(
  Medium,
  css`
    color: #313131;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
  `
);

export const FooterTextMedium = cx(
  Medium,
  css`
    color: #313131;
    font-size: var(--font-sizes-xxs);
    line-height: 18px;
  `
);

export const FooterTextSelected = cx(
  Semibold,
  css`
    color: var(--colors-main);
    font-size: var(--font-sizes-xxs);
    line-height: 18px;
  `
);

export const HeaderText = cx(
  Medium,
  css`
    color: #313131;
    font-size: var(--font-sizes-lg);
    line-height: 26px;
  `
);

export const ProfileTitle = cx(
  Semibold,
  css`
    color: #313131;
    font-size: var(--font-sizes-sm);
    line-height: 18px;
  `
);

export const ProfileInfo = cx(
  Regular,
  css`
    color: #767676;
    font-size: var(--font-sizes-xs);
    line-height: 18px;
  `
);

export const HomeContent = cx(
  Semibold,
  css`
    color: var(--colors-main);
    font-size: var(--font-sizes-base);
    line-height: 36px;
  `
);

export const HomeContentBigNum = cx(
  Bold,
  css`
    font-size: var(--font-sizes-xxl);
    line-height: 40px;
  `
);

export const HomeContentNum = cx(
  Semibold,
  css`
    color: #313131;
    font-size: var(--font-sizes-base);
    line-height: 36px;
  `
);

export const HomeHeaderContent = cx(
  Medium,
  css`
    color: #313131;
    font-size: var(--font-sizes-xl);
    line-height: 28px;
  `
);

export const PrfileTitle = cx(
  Bold,
  css`
    color: #313131;
    font-size: var(--font-sizes-xxl);
    line-height: 32px;
  `
);

export const StartBrand = cx(
  Semibold,
  css`
    color: #313131;
    font-size: var(--font-sizes-xxl);
    line-height: 32px;
  `
);

export const StartBrandSub = cx(
  Regular,
  css`
    color: #767676;
    font-size: var(--font-sizes-base);
    line-height: 24px;
  `
);

export const RegistCoffeeBtn = cx(
  Medium,
  css`
    color: #767676;
    font-size: var(--font-sizes-xxl);
    line-height: 32px;
  `
);

export const AlertMessage = cx(
  Regular,
  css`
    color: #a6a6a6;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
  `
);

export const CommnetUser = cx(
  Semibold,
  css`
    color: #313131;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
  `
);

export const CommentLength = cx(
  Regular,
  css`
    color: #767676;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
  `
);
export const ColorMain = css`
  font-weight: 500;
  color: var(--colors-main);
`;

export const Divider = css`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    border-top: 1px solid #edecec;
    left: -20px;
    width: calc(50% + 20px);
  }
  &::before {
    content: '';
    position: absolute;
    border-top: 1px solid #edecec;
    right: -20px;
    width: calc(50% + 20px);
  }
`;

export const Blur = css`
  filter: blur(1px);
`;
