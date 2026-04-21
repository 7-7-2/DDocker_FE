import { lazy, Suspense } from 'react';

import RegisterLabel from '@/components/post/postRegister/RegisterLabel';
import useGetUserInfo from '@/hooks/useGetUserInfo';

import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { useCoffeeSelection } from '@/hooks/useCoffeeSelection';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  CaffeineFilterHomeLabel,
  HomeLabelStyle,
  RegisterContentsStyle
} from '@/styles/styles';
import { Column, Grid } from '@/styles/layout';

const SelectBox = lazy(() => import('@/components/common/SelectBox'));

const { coffeeMenu } = CAFFEINE_FILTER_TEXTS;

const CoffeeMenuSelection = () => {
  useGetUserInfo();
  const {
    register,
    caffeineIntake,
    brandList,
    menuList,
    selectBrand,
    selectMenu
  } = useCoffeeSelection();

  const slectBoxType = register ? 'commonBaseSize' : 'commonSmSize';

  return (
    <>
      {!register && (
        <span className={CaffeineFilterHomeLabel}>{coffeeMenu.title}</span>
      )}
      <CoffeeSelectContainer className={cx(register ? Column : HomeStyle)}>
        <Suspense>
          <div className={cx(register && RegisterContentsStyle)}>
            {register && <RegisterLabel label={coffeeMenu.brand} />}
            <SelectBox
              value={caffeineIntake.brand}
              defaultValue={caffeineIntake.brand || coffeeMenu.brand}
              data={brandList}
              onClick={selectBrand}
              className={slectBoxType}
            />
          </div>
          <div className={cx(register && RegisterContentsStyle)}>
            {register && <RegisterLabel label={coffeeMenu.menu} />}
            <SelectBox
              value={caffeineIntake.productName}
              defaultValue={coffeeMenu.menu}
              data={menuList}
              onClick={selectMenu}
              className={slectBoxType}
            />
          </div>
        </Suspense>
      </CoffeeSelectContainer>
    </>
  );
};

const CoffeeSelectContainer = styled.div`
  position: relative;
  grid-template-columns: calc(50% - 4px) calc(50% - 4px);
`;

const HomeStyle = cx(
  Grid,
  HomeLabelStyle,
  css`
    gap: 9px;
  `
);

export default CoffeeMenuSelection;
