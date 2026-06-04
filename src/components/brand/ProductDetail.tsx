import { Toaster } from 'react-hot-toast';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import CoffeeOptionSelection from '@/components/common/coffeeSelection/CoffeeOptionSelection';
import CaffeineInfo from '@/components/home/CaffeineInfo';
import FavoriteMenuAddModal from '@/components/post/postRegister/FavoriteMenuAddModal';
import ModalCTA from '@/components/common/ModalCTA';
import ProductComparisons from '@/components/brand/ProductComparisons';

import { useShowFooter } from '@/hooks/useShowFooter';
import { useHandleHeaderBackGround } from '@/hooks/useHandleHeaderBackGround';
import { useFavoriteMenu } from '@/hooks/post/useFavoriteMenu';
import { useProductDetail } from '@/hooks/brand/useProductDetail';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { brandMapToKor } from '@/utils/convertBrandName';
import { coffeeInfoFormatter } from '@/utils/coffeeInfoFormatter';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { BUTTON_TEXTS } from '@/constants/common';
import { POST_REGISTER_TEXTS } from '@/constants/texts';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column, FlexCenter } from '@/styles/layout';
import {
  DefaultBtn,
  DisabledBtn,
  Gap24,
  MarginT24,
  Medium,
  ScrolledShadow,
  SectionDivier,
  Semibold
} from '@/styles/styles';

const { addFavoriteMenu } = POST_REGISTER_TEXTS.success;
const ProductDetail = () => {
  useShowFooter(false);
  const {
    state,
    isModal,
    isFavMenu,
    handleModal,
    handleFavBtn,
    handleRegisterBtn,
    caffeineIntake,
    comparisonData
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
        className={cx(isScrolled && ScrolledShadow)}
        style={{
          backgroundColor: `${!isScrolled ? '#f1f1f1' : '#fff'}`
        }}
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

          {comparisonData && (
            <ProductComparisons
              productName={state.menu || caffeineIntake.productName}
              comparisonData={comparisonData?.comparisons}
            />
          )}
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
                text={BUTTON_TEXTS.register}
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
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

const Img = styled.div`
  height: 218px;
  aspect-ratio: 1;
  margin: auto;
`;
export default ProductDetail;
