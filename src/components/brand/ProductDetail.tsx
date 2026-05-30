import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import CoffeeOptionSelection from '@/components/common/coffeeSelection/CoffeeOptionSelection';
import CaffeineInfo from '@/components/home/CaffeineInfo';

import { caffeineFilterState, caffeineIntakeState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Column, Flex, FlexCenter } from '@/styles/layout';
import {
  colorMidGrey,
  DefaultBtn,
  DisabledBtn,
  Gap24,
  Gap6,
  MarginT24,
  Medium,
  SectionDivier,
  Semibold
} from '@/styles/styles';
import { brandMapToKor } from '@/utils/convertBrandName';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useFavoriteMenu } from '@/hooks/post/useFavoriteMenu';
import FavoriteMenuAddModal from '@/components/post/postRegister/FavoriteMenuAddModal';
import { coffeeInfoFormatter } from '@/utils/coffeeInfoFormatter';
import { Toaster } from 'react-hot-toast';
import ModalCTA from '@/components/common/ModalCTA';
import { BUTTON_TEXTS } from '@/constants/common';
import { POST_REGISTER_TEXTS } from '@/constants/texts';
import { useHandleHeaderBackGround } from '@/hooks/useHandleHeaderBackGround';
import { useProductDetail } from '@/hooks/brand/useProductDetail';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';

const { addFavoriteMenu } = POST_REGISTER_TEXTS.success;
const ProductDetail = () => {
  const {
    state,
    isModal,
    isFavMenu,
    handleModal,
    handleFavBtn,
    handleRegisterBtn,
    caffeineIntake
  } = useProductDetail();
  const { isScrolled, scrollAnchor } = useHandleHeaderBackGround();
  const { handleOnClick, isfailed, moveFavoriteTab } = useFavoriteMenu();
  const { userId } = useCachedUserInfo();

  const { coffeeInfo } = coffeeInfoFormatter(caffeineIntake);

  return (
    <>
      {isModal && !isfailed ? (
        <FavoriteMenuAddModal
          handleModal={handleModal}
          handleOnclick={handleOnClick}
          contents={coffeeInfo}
        />
      ) : (
        <ModalCTA
          buttonText={[BUTTON_TEXTS.close, BUTTON_TEXTS.edit]}
          title={addFavoriteMenu.ModalText.max}
          description={addFavoriteMenu.description}
          fn={moveFavoriteTab}
        />
      )}
      <Toaster />
      <HeaderBackground
        style={{ backgroundColor: `${!isScrolled ? '#f1f1f1' : '#fff'}` }}
      />
      <Container>
        <Img ref={scrollAnchor}></Img>
        <ContentsBox>
          <div className={Column}>
            <Brand className={Medium}>
              {brandMapToKor(state.brand || caffeineIntake.brand)}
            </Brand>
            <ProductName className={Semibold}>
              {state.menu || caffeineIntake.productName}
            </ProductName>
          </div>
          <CoffeeOptionSelection />
          <div className={cx(SectionDivier, MarginT24)} />

          <SimilarItemList className={Column}>
            <span
              className={Semibold}
              style={{ fontSize: 'var(--font-sizes-lg)' }}>
              다른 브랜드의 '{state.menu || caffeineIntake.productName}'
            </span>
            <SimilarItem>
              <TemporaryImg />
              <Info className={cx(Column, Align)}>
                <span className={colorMidGrey}>스타벅스</span>
                <span
                  className={Semibold}
                  style={{ fontSize: 'var(--font-sizes-sm)' }}>
                  250mg
                </span>
                <div className={cx(Medium, Flex, Align, Gap6)}>
                  <Icon {...iconPropsGenerator('up', '7')} />
                  <span style={{ color: 'var(--colors-delete-red)' }}>35</span>
                </div>
              </Info>
            </SimilarItem>
          </SimilarItemList>
          <div style={{ height: '102px' }} />

          <BrandFooter className={Column}>
            <div>
              <CaffeineInfo />
            </div>
            <ButtonContainer className={cx(FlexCenter, Gap24)}>
              <button onClick={handleFavBtn}>
                <Icon
                  {...iconPropsGenerator(isFavMenu ? 'fav-active' : 'fav')}
                />
              </button>
              <Button
                text={'등록하기'}
                onClick={handleRegisterBtn}
                className={userId ? DefaultBtn : DisabledBtn}
              />
            </ButtonContainer>
          </BrandFooter>
        </ContentsBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-left: -20px;
  /* margin-top: -56px; */
  height: 100dvh;
  width: 100dvw;
  max-width: 500px;
  position: relative;
  overflow-y: scroll;
  color: var(--colors-main-dark);
  background-color: #f1f1f1;
`;

const HeaderBackground = styled.div`
  width: 100dvw;
  height: 56px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const SimilarItemList = styled.div`
  padding: 24px 0;
  gap: 20px;
`;
const SimilarItem = styled.div`
  width: fit-content;
  align-content: center;
`;
const Info = styled.div`
  margin-top: 12px;
  font-size: var(--font-sizes-xs);
  gap: 4px;
`;
const ContentsBox = styled.div`
  height: auto;
  width: 100%;
  position: absolute;
  top: 218px;
  padding: 20px;
  background-color: #fff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  z-index: 1;
`;
const Brand = styled.span`
  line-height: 22px;
  color: var(--colors-mid-grey);
`;
const ProductName = styled.span`
  font-size: 22px;
  line-height: 30px;
  margin-bottom: -4px;
`;
const BrandFooter = styled.div`
  height: 123px;
  width: 100%;
  padding: 10px 20px 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  border-top: solid 1px var(--colors-border-grey);
`;
const ButtonContainer = styled.div`
  margin-top: -12px;
`;

const TemporaryImg = styled.div`
  width: 72px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #f1f1f1;
`;

const Img = styled.div`
  height: 218px;
  aspect-ratio: 1;
  margin: auto;
`;
export default ProductDetail;
