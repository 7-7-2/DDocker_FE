import { useRecoilValue } from 'recoil';

import BrandItem from '@/components/start/BrandItem';
import Button from '@/components/common/Button';
import { SELECTFAVBRAND_TEXTS } from '@/constants/start';
import { BUTTON_TEXTS } from '@/constants/common';

import { getMyInfo, setUserInitInfo } from '@/api/user';
import { authState } from '@/atoms/atoms';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { AuthTypes } from '@/types/types';

import { cx } from 'styled-system/css';
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
import { useLocation } from 'react-router-dom';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import useGetCacheData from '@/hooks/useGetCacheData';

const imagePath = import.meta.env.VITE_R2_USER_IMAGE_PATH;

const { message } = SELECTFAVBRAND_TEXTS;

export const SelectFavBrand = () => {
  useComposeHeader(false, '기본정보', 'close');
  const { state: imageFile } = useLocation();
  const getUserId = async () => await useGetCacheData('user', '/userId');
  const { uploadStorage } = useCloudStorage();

  const user = useRecoilValue(authState);

  const navigateToHome = useNavigateTo('/');
  const navigateToMe = useNavigateTo('/start/3');
  const brandList = useGetCoffeeList('brand') as string[];

  const handleStartBtn = (file: File) => async () => {
    const { cacheData: userId } = await getUserId();
    const route = `user/${userId}`;
    file && (await uploadStorage(route, file));
    const storagePath = `${imagePath}%2F${userId}`;

    const userInfo: AuthTypes = {
      nickname: user.nickname,
      brand: user.brand,
      aboutMe: user.aboutMe,
      profileUrl: file ? storagePath : ''
    };
    await setUserInitInfo(userInfo);
    await getMyInfo();
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
          {brandList?.map(item => (
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
        onTouchEnd={user.brand ? handleStartBtn(imageFile) : navigateToMe}
        className={user.brand ? DefaultBtn : cx(DefaultBtn, DisabledBtn)}
      />
    </>
  );
};

const BrandItemContainer = styled.div`
  margin: 2.375rem auto 3.75rem;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
`;
