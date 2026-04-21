import Button from '@/components/common/Button';
import CoffeeInfo from '@/components/post/postRegister/CoffeeInfo';

import { BUTTON_TEXTS } from '@/constants/common';
import { POST_REGISTER_TEXTS } from '@/constants/texts';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  BtnColorBorderWhite,
  BtnColorMain,
  DubbleShortBtn,
  RegisterModal,
  Regular,
  Semibold
} from '@/styles/styles';
import { Between, Column, DVW, Flex, FlexCenter } from '@/styles/layout';

const { addFavoriteMenu } = POST_REGISTER_TEXTS.success;

const FavoriteMenuAddModal = ({
  handleModal,
  handleOnclick,
  contents
}: {
  handleModal: () => void;
  handleOnclick: () => void;
  contents: Array<string | number>;
}) => {
  return (
    <Background
      onClick={handleModal}
      className={cx(FlexCenter, DVW)}>
      <div className={cx(RegisterModal)}>
        <ModalText className={Semibold}>
          {addFavoriteMenu.ModalText.add}
        </ModalText>
        <CaffeineIntake className={cx(Column, Regular)}>
          <CoffeeInfo
            contents={contents}
            type="modal"
          />
        </CaffeineIntake>
        <BtnContainer className={cx(Flex, Between)}>
          <Button
            text={BUTTON_TEXTS.cancel}
            onClick={handleModal}
            className={cx(BtnColorBorderWhite, DubbleShortBtn)}
          />
          <Button
            text={BUTTON_TEXTS.register}
            onClick={handleOnclick}
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

const BtnContainer = styled.div`
  gap: 8px;
`;

export default FavoriteMenuAddModal;
