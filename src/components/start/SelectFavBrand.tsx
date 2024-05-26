import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';

import Button from '@/components/common/Button';
import BrandItem from '@/components/start/BrandItem';
import { BUTTON_TEXTS } from '@/constants/common';
import { SELECTFAVBRAND_TEXTS } from '@/constants/start';

import { useNavigateTo } from '@/hooks/useNavigateTo';
import useGetCacheData from '@/hooks/useGetCacheData';
import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useDeleteCacheData } from '@/hooks/useDeleteCacheData';

import { authState } from '@/atoms/atoms';
import { InitialformTypes } from '@/types/types';
import { getMyInfo, setUserInitInfo } from '@/api/user';

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

const imagePath = import.meta.env.VITE_R2_USER_IMAGE_PATH;

const { message } = SELECTFAVBRAND_TEXTS;

const SelectFavBrand = () => {
  useComposeHeader(false, '기본정보', 'close');
  const navigateToHome = useNavigateTo('/');
  const { state: imageFile } = useLocation();
  const { uploadStorage } = useCloudStorage();
  const user = useRecoilValue(authState);
  const brandList = useGetCoffeeList('brand') as string[];
  const handleStartBtn = (file: File) => async () => {
    const userId = nanoid();
    const social = await useGetCacheData('user', '/social');
    const email = await useGetCacheData('user', '/socialEmail');

    const route = `user/${userId}`;
    file && (await uploadStorage(route, file));
    const storagePath = `${imagePath}%2F${userId}`;

    const userInfo: InitialformTypes = {
      useremail: email.cacheData,
      social: social.cacheData,
      userId: userId,
      nickname: user.nickname,
      brand: user.brand,
      aboutMe: user.aboutMe || null,
      profileUrl: file ? storagePath : ''
    };

    await setUserInitInfo(userInfo);
    await useDeleteCacheData('user', [
      '/socialToken',
      '/socialEmail',
      '/isRegistering'
    ]);
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
        onTouchEnd={handleStartBtn(imageFile)}
        className={user.brand ? DefaultBtn : cx(DefaultBtn, DisabledBtn)}
      />
    </>
  );
};

const BrandItemContainer = styled.div`
  gap: 12px;
  margin: 2.375rem auto 3.75rem;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default SelectFavBrand;
