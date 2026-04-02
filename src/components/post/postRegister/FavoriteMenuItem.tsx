import CoffeeInfo from '@/components/post/postRegister/CoffeeInfo';
import Button from '@/components/common/Button';

import { caffeineIntakeTypes } from '@/types/types';
import { coffeeInfoFormatter } from '@/utils/coffeeInfoFormatter';
import { BUTTON_TEXTS, CAFFEINE_TEXTS } from '@/constants/common';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Column, Flex, FlexCenter } from '@/styles/layout';
import { Bold, BtnColorMain, ShortBtn, TertiaryBtn } from '@/styles/styles';

const FavoriteMenuItem = ({ itemData }: { itemData: caffeineIntakeTypes }) => {
  const { caffeine, coffeeInfo } = coffeeInfoFormatter(itemData);
  // 임시
  const deleteItem = () => [console.log('삭제')];
  const useCoffeeData = () => {};

  return (
    <>
      <Container className={cx(Column, Between)}>
        <FavoriteMenu className={cx(Flex, Between)}>
          <ImgContainer></ImgContainer>
          <CoffeeInfoContainer className={Column}>
            <CoffeeInfo contents={coffeeInfo} />
            <Caffeine className={cx(FlexCenter, Bold)}>
              {caffeine}
              {CAFFEINE_TEXTS.unit}
            </Caffeine>
          </CoffeeInfoContainer>
          <Button
            text={BUTTON_TEXTS.delete}
            onClick={deleteItem}
            className={cx(TertiaryBtn)}
          />
        </FavoriteMenu>
        <BtnContainer className={cx(Column)}>
          <Button
            text={BUTTON_TEXTS.register}
            onClick={useCoffeeData}
            className={cx(ShortBtn, BtnColorMain)}
          />
        </BtnContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 192px;
  padding: 22px 0 16px;
  border-bottom: 1px solid var(--colors-border-grey);
`;

const ImgContainer = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: var(--colors-tertiary);
`;

const BtnContainer = styled.div`
  align-items: flex-end;
`;

const FavoriteMenu = styled.div`
  width: 100%;
  flex-direction: row;
  gap: 17px;
`;

const CoffeeInfoContainer = styled.div`
  flex-grow: 1;
`;

const Caffeine = styled.div`
  width: 57px;
  height: 26px;
  border: 1px solid var(--colors-dark-grey);
  border-radius: 20px;
  color: var(--colors-dark-grey);
  font-size: var(--font-sizes-xs);
  margin-top: 10px;
`;
export default FavoriteMenuItem;
