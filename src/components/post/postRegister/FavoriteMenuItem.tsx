import { MouseEventHandler } from 'react';
import { useSetRecoilState } from 'recoil';

import CoffeeInfo from '@/components/post/postRegister/CoffeeInfo';
import Button from '@/components/common/Button';

import { useCoffeeSelection } from '@/hooks/useCoffeeSelection';
import { coffeeInfoFormatter } from '@/utils/coffeeInfoFormatter';
import { caffeineIntakeState } from '@/atoms/atoms';
import { FavoriteMenuTypes } from '@/types/types';
import { BUTTON_TEXTS, CAFFEINE_TEXTS } from '@/constants/common';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Column, Flex, FlexCenter } from '@/styles/layout';
import { Bold, BtnColorMain, ShortBtn, TertiaryBtn } from '@/styles/styles';

const FavoriteMenuItem = ({
  itemData,
  deleteItem,
  backInitialTab,
  type
}: {
  itemData: FavoriteMenuTypes;
  deleteItem: MouseEventHandler<HTMLButtonElement>;
  backInitialTab?: () => void;
  type?: boolean;
}) => {
  const { id, userId, ...caffieneIntake } = itemData;
  console.log('🚀 ~ FavoriteMenuItem ~ caffieneIntake:', caffieneIntake);
  const { caffeine, coffeeInfo } = coffeeInfoFormatter(caffieneIntake);
  console.log('🚀 ~ FavoriteMenuItem ~ coffeeInfo:', coffeeInfo);

  // 등록에서 사용하기
  const setCaffeineIntake = useSetRecoilState(caffeineIntakeState);
  const { mutate: setCaffineFilter } = useCoffeeSelection();
  const useCoffeeData = () => {
    setCaffeineIntake(caffieneIntake);
    setCaffineFilter();
    backInitialTab?.();
  };

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
            value={id}
            text={BUTTON_TEXTS.delete}
            onClick={deleteItem}
            className={cx(TertiaryBtn)}
          />
        </FavoriteMenu>
        {!type && (
          <BtnContainer className={cx(Column)}>
            <Button
              text={BUTTON_TEXTS.register}
              onClick={useCoffeeData}
              className={cx(ShortBtn, BtnColorMain)}
            />
          </BtnContainer>
        )}
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
