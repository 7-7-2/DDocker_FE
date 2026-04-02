import toast from 'react-hot-toast';

import Button from '@/components/common/Button';

import { BUTTON_TEXTS } from '@/constants/common';
import { POST_REGISTER_TEXTS } from '@/constants/texts';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  BtnColorBorderWhite,
  BtnColorMain,
  DubbleShortBtn,
  Medium,
  RegisterModal,
  Regular,
  Semibold
} from '@/styles/styles';
import { Between, Column, DVW, Flex, FlexCenter } from '@/styles/layout';

const { addFavoriteMenu } = POST_REGISTER_TEXTS.success;

const FavoriteMenuAddModal = ({
  handleModal,
  contents
}: {
  handleModal: () => void;
  contents: Array<string | number>;
}) => {
  const registerFavMenu = () => {
    //post > 즐겨찾는 메뉴 등록
    handleModal();
    toast.success(addFavoriteMenu.addedText, {
      duration: 2000,
      position: 'bottom-center',
      icon: null,
      style: {
        borderRadius: '50px',
        backgroundColor: 'var(--colors-main-dark)',
        color: '#fff',
        fontSize: 'var(--font-sizes-sm)',
        fontWeight: '500',
        height: '42px',
        width: '208px',
        marginBottom: '94px'
      }
    });
  };

  return (
    <Background
      onClick={handleModal}
      className={cx(FlexCenter, DVW)}>
      <div className={cx(RegisterModal)}>
        <ModalText className={Semibold}>{addFavoriteMenu.ModalText}</ModalText>
        <CaffeineIntake className={cx(Column, Regular)}>
          <Item>{contents[0]}</Item>
          <ProductNameItem className={Medium}>{contents[1]}</ProductNameItem>
          <Item>({contents[2]})</Item>
        </CaffeineIntake>
        <BtnContainer className={cx(Flex, Between)}>
          <Button
            text={BUTTON_TEXTS.cancel}
            onClick={handleModal}
            className={cx(BtnColorBorderWhite, DubbleShortBtn)}
          />
          <Button
            text={BUTTON_TEXTS.register}
            onClick={registerFavMenu}
            className={cx(BtnColorMain, DubbleShortBtn)}
          />
        </BtnContainer>
      </div>
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  height: 100dvh;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalText = styled.div`
  line-height: 24px;
  text-align: center;
  justify-content: center;
  font-size: var(--font-sizes-base);
`;

const CaffeineIntake = styled.div`
  height: 96px;
  width: auto;
  padding: 16px;
  margin: 20px 0 28px;
  border-radius: 10px;
  background-color: var(--colors-tertiary);
`;

const ProductNameItem = styled.span`
  line-height: 20px;
  font-size: var(--font-sizes-sm);
  color: var(--colors-main-dark);
`;

const Item = styled.div`
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
`;

const BtnContainer = styled.div`
  gap: 8px;
`;

export default FavoriteMenuAddModal;
