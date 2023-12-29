import { useRecoilValue } from 'recoil';
import { setInitialInfo } from '@/api/user';
import { authState } from '@/atoms/atoms';
import BrandItem from '@/components/start/BrandItem';
import Button from '@/components/common/Button';

import { SELECTFAVBRAND_TEXTS } from '@/constants/start';
import { BUTTON_TEXTS } from '@/constants/common';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { setBrnadList } from '@/utils/setBrandList';
import { useImgSubmit } from '@/hooks/useImgSubmit';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { AuthTypes } from '@/types/types';
import { styled } from 'styled-system/jsx';
import { Grid } from '@/styles/layout';
import {
  DefaultBtn,
  DisabledBtn,
  StartPageContainer,
  StartBrand,
  StartBrandSub,
  MarginT28
} from '@/styles/styles';
import { cx } from 'styled-system/css';

const { message } = SELECTFAVBRAND_TEXTS;

export const SelectFavBrand = () => {
  useComposeHeader(false, '기본정보', 'close');
  const { user } = useRecoilValue(authState);
  const { handleFormSubmit, setImageUrl } = useImgSubmit();

  const navigateToHome = useNavigateTo('/');
  const navigateToMe = useNavigateTo('/start/3');
  const brandList = setBrnadList();

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
    setInitialInfo(userInfo);
    handleFormSubmit();
    navigateToHome();
  };

  return (
    <>
      <div className={StartPageContainer}>
        <div className={cx(StartBrand, MarginT28)}>
          <span>{message.first}</span>
          <br />
          <span className={StartBrandSub}>{message.second}</span>
        </div>
        <BrandItemContainer className={Grid}>
          {brandList.map(item => (
            <BrandItem
              key={item}
              brand={item}
              icon={item}
            />
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
  margin-top: 1.75rem;
  color: #313131;
  font-size: var(--font-sizes-xxl);
  font-weight: 600;
  line-height: 2rem;
`;

const SecondLine = styled.span`
  color: #767676;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
`;

const BrandItemContainer = styled.div`
  margin: 2.375rem auto 3.75rem;
  gap: 0.75rem 0.75rem;
  grid-template-columns: 1fr 1fr 1fr;
`;
