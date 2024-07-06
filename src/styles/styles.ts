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
    color: var(--colors-mid-grey);
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
  pointer-events: none;
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
    color: var(--colors-mid-grey);
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
  color: var(--colors-mid-grey);
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

export const MarginT6 = css`
  margin-top: 6px;
`;

export const MarginT12 = css`
  margin-top: 12px;
`;

export const MarginT16 = css`
  margin-top: 16px;
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
    width: 100%;
    color: var(--colors-main-dark);
    font-size: var(--font-sizes-sm);
    line-height: 22px;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  `
);

export const StartPageBtnContainer = css`
  position: absolute;
  background-color: #ffffff;
  border-top: 1px solid #edecec;
  padding: 10px 20px;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const Cursor = css`
  cursor: pointer;
`;

export const LineH18 = css`
  line-height: 18px;
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

export const SelectedTap = cx(
  Semibold,
  css`
    color: var(--colors-main);
    border-bottom: 2px solid var(--colors-main);
  `
);

export const DefaultTap = cx(
  Medium,
  css`
    color: var(--colors-subtext);
    border-bottom: 1px solid var(--colors-btn-grey);
  `
);

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
    color: var(--colors-mid-grey);
    line-height: 20px;
  `
);

export const SearchPageHeight = css`
  height: calc(
    100dvh - 50px - env(safe-area-inset-bottom) - env(safe-area-inset-top)
  );
`;

export const RegisterPageHeight = css`
  height: calc(
    100dvh - 46px - env(safe-area-inset-bottom) - env(safe-area-inset-top)
  );
`;

export const GeneralHeight = css`
  height: calc(
    100dvh - 46px - 50px - env(safe-area-inset-bottom) - env(
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
    color: var(--colors-mid-grey);
    font-size: var(--font-sizes-xs);
    line-height: 20px;
  `
);

export const SumTypeAmount = cx(
  Bold,
  css`
    color: var(--colors-main);
    font-size: var(--font-sizes-xl);
    line-height: 24px;
  `
);

export const SumTypeUnit = cx(
  Medium,
  css`
    color: #313131;
    font-size: var(--font-sizes-sm);
    line-height: 24px;
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

export const CaffeineFilterLabel = cx(
  Semibold,
  css`
    color: #313131;
    font-size: var(--font-sizes-sm);
    line-height: 22px;
    margin: 12px 0 6px;
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

export const ProfileAboutMe = cx(
  Regular,
  css`
    color: #a6a6a6;
    font-size: var(--font-sizes-sm);
    line-height: 18px;
  `
);

export const StartBrand = cx(
  Semibold,
  css`
    color: #313131;
    font-size: var(--font-sizes-xxl);
    line-height: 32px;
    margin-top: 28px;
  `
);

export const StartBrandDescription = cx(
  Regular,
  css`
    margin-top: 4px;
    color: var(--colors-mid-grey);
    font-size: var(--font-sizes-base);
    line-height: 22px;
    letter-spacing: -0.4px;
    white-space: pre-wrap;
    text-align: justify;
  `
);

export const RegistCoffeeBtn = cx(
  Medium,
  css`
    color: var(--colors-mid-grey);
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

export const ColorMain = css`
  font-weight: 500;
  color: var(--colors-main);
`;

export const Divider = css`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    border-top: 1px solid var(--colors-border-grey);
    left: -20px;
    width: calc(50% + 20px);
  }
  &::before {
    content: '';
    position: absolute;
    border-top: 1px solid var(--colors-border-grey);
    right: -20px;
    width: calc(50% + 20px);
  }
`;

export const Blur = css`
  filter: blur(1px);
`;

export const PaddingL4 = css`
  padding-left: 4px;
`;

export const PaddingR8 = css`
  padding-right: 8px;
`;

export const Gap6 = css`
  gap: 6px;
`;

export const SectionHeader = css`
  padding-bottom: 12px;
  font-size: var(--font-sizes-lg);
  font-weight: 600;
  color: var(--colors-main-dark);
  line-height: 26px;
`;

export const RightCardSpacer = styled.div`
  &::after {
    content: '';
    display: block;
    width: 10px;
  }
`;

export const LeftCardSpacer = styled.div`
  &::after {
    content: '';
    display: block;
    width: 20px;
  }
`;

export const CancelBtn = css`
  color: var(--colors-main-dark);
  font-size: var(--font-sizes-sm);
`;

export const TrendDivider = css`
  margin-left: -20px;
  margin-right: -20px;
  &::after {
    content: '';
    display: block;
    margin-top: 32px;
    height: 8px;
    background-color: var(--colors-tertiary);
  }
`;

export const Default = css`
  border: 1px solid #ccc;
  background: #ebebeb;
  text-align: center;
`;

export const PaddingTB60 = css`
  padding: 60px 0;
`;

export const CTAContainer = css`
  margin-top: calc(50dvh - 136px + env(safe-area-inset-bottom));
`;

export const FollowBtnCommon = css`
  width: 80px;
  height: 30px;
  border-radius: 6px;
  font-size: var(--font-sizes-xs);
  font-weight: 500;
  line-height: 20px;
`;

export const FollowBtnStyle = css`
  background-color: var(--colors-main);
  color: #fff;
`;

export const FollowingBtnStyle = css`
  background-color: var(--colors-tertiary);
`;

export const Transition = css`
  &:active {
    animation-name: like;
    animation-duration: 2s;
  }
`;

export const Spinner = css`
  width: 40px;
  height: 40px;
  position: relative;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto auto;
  border: 4px solid var(--colors-main);
  border-top-color: transparent;
  border-radius: 50%;
  animation: loader 0.7s infinite ease-in-out;
`;

export const AlignCTA = css`
  height: calc(
    100dvh - 46px - 50px - env(safe-area-inset-bottom) - env(
        safe-area-inset-top
      )
  );
  margin: auto 0;
`;

export const NotificationContainer = css`
  margin-top: -20px;
`;

export const CustomerItem = css`
  border-bottom: 1px solid var(--colors-border-grey);
  color: var(--colors-main-dark);
  white-space: pre-wrap;
`;

export const CustomerTitle = css`
  line-height: 22px;
  font-size: var(--font-sizes-sm);
`;

export const CustomertDate = css`
  line-height: 20px;
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
`;

export const CustomerContents = css`
  line-height: 18px;
  white-space: pre-wrap;
  font-size: var(--font-sizes-xs);
`;

export const SupportContentsContainer = css`
  height: calc(100vh - 188px);
  margin: 14px -10px 14px 0;
  padding: 0 10px 14px 4px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: block !important;
    background-color: transparent;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--colors-main);
    border-radius: 20px;
  }
`;
export const SupportChpater = cx(
  Semibold,
  css`
    color: var(--colors-main);
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--colors-border-grey);
    font-size: var(--font-sizes-lg);
    line-height: 24px;
    display: block;
  `
);
export const SupportContentTitle = cx(
  Semibold,
  css`
    line-height: 22px;
    font-size: var(--font-sizes-sm);
    display: block;
  `
);

export const SupportContent = css`
  margin-top: -18px;
  line-height: 20px;
  display: inline-block;
  text-align: justify;
  display: block;
`;

export const RadioBtnContainer = css`
  border-radius: 50%;
  width: 16px;
  height: 16px;
  position: relative;
`;
