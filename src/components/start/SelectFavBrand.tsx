import { useRecoilValue } from 'recoil';
import { setInitialInfo } from '@/api/user';
import { authState } from '@/atoms/atoms';
import BrandItem from '@/components/start/BrandItem';
import Button from '@/components/common/Button';
import { SELECTFAVBRAND_TEXTS, BRANDLIST } from '@/constants/start';
import { BUTTON_TEXTS } from '@/constants/common';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useImgSubmit } from '@/hooks/useImgSubmit';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { AuthTypes } from '@/types/types';
import { styled } from 'styled-system/jsx';
import { Grid } from '@/styles/layout';
import { DefaultBtn, DisabledBtn, StartPageContainer } from '@/styles/styles';
import { cx } from 'styled-system/css';

const { message } = SELECTFAVBRAND_TEXTS;

export const SelectFavBrand = () => {
  useComposeHeader(false, '기본정보', 'close');
  const { user } = useRecoilValue(authState);
  const { handleFormSubmit, setImageUrl } = useImgSubmit();

  const navigateToHome = useNavigateTo('/');
  const navigateToMe = useNavigateTo('/start/3');

  const handleStartBtn = () => {
    const userInfo: AuthTypes = {
      initialized: true,
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        brand: user.brand,
        gender: user.gender,
        profileUrl: user.profileUrl || ''
      },
      signIn: true
    };
    console.log(userInfo);
    setInitialInfo(userInfo);
    handleFormSubmit();
    navigateToHome();
  };

  return (
    <>
      <div className={StartPageContainer}>
        <InitialFormText>
          <span>{message.first}</span>
          <br />
          <SecondLine>{message.second}</SecondLine>
        </InitialFormText>
        <BrandItemContainer className={Grid}>
          {BRANDLIST.map((item, idx) => (
            <div key={idx}>
              <BrandItem
                brand={item.brand}
                icon={item.icon}
              />
            </div>
          ))}
        </BrandItemContainer>
      </div>

      <Button
        text={BUTTON_TEXTS.start}
        onTouchEnd={user.brand ? handleStartBtn : navigateToMe}
        className={user.brand ? DefaultBtn : cx(DefaultBtn, DisabledBtn)}
      />
    </>
  );
};

const InitialFormText = styled.div`
  margin-top: 28px;
  color: #313131;
  font-size: var(--font-sizes-xxl);
  font-weight: 600;
  line-height: 32px;
`;

const SecondLine = styled.span`
  color: #767676;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const BrandItemContainer = styled.div`
  margin: 38px auto 60px;
  gap: 12px 12px;
  grid-template-columns: 1fr 1fr 1fr;
`;
