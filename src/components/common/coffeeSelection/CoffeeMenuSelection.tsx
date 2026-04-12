import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import RegisterLabel from '@/components/post/postRegister/RegisterLabel';
const SelectBox = lazy(() => import('@/components/common/SelectBox'));

import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { caffeineFilterState, caffeineIntakeState } from '@/atoms/atoms';
import { CoffeeDataTypes } from '@/types/types';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  CaffeineFilterHomeLabel,
  HomeLabelStyle,
  RegisterContentsStyle
} from '@/styles/styles';
import { Column, Grid } from '@/styles/layout';

const { coffeeMenu, coffeeOption } = CAFFEINE_FILTER_TEXTS;

const CoffeeMenuSelection = () => {
  const { postId } = useParams();
  const { type } = useParams();
  const register = postId === 'register' || type === 'update';

  const [caffeineIntake, setCaffeineIntake] =
    useRecoilState(caffeineIntakeState);
  const setCaffeine = useSetRecoilState(caffeineFilterState);
  const coffeeData = useGetCoffeeList() as CoffeeDataTypes;
  const brandList = useGetCoffeeList('brand') as string[];

  const setRegisterData = (key: string, value: string | number) => {
    if (key === 'brand') {
      const newRegistData = {
        ...caffeineIntake,
        [key]: value as string,
        productName: ''
      };
      setCaffeineIntake(newRegistData);
      return;
    }

    if (key === 'productName') {
      const newRegistData = {
        ...caffeineIntake,
        [key]: value as string,
        shot: 0,
        size: coffeeOption.sizeOption[0],
        intensity: '기본'
      };
      setCaffeineIntake(newRegistData);
      return;
    }
  };

  const setCaffeineInfo = (caffeinie: number) => {
    setCaffeine({
      caffeine: caffeinie,
      menuCaffeine: caffeinie
    });
  };

  // 선택한 커피 브랜드 메뉴 리스트 조회
  const getMenuList = (selectedBrand: string) => {
    const res = coffeeData?.[selectedBrand]?.map(item => item.menu);
    return res;
  };
  const menuList = coffeeData && getMenuList(caffeineIntake.brand);

  // 커피 브랜드 선택
  const selectBrand = (e: React.MouseEvent<HTMLButtonElement>) => {
    getMenuList(e.currentTarget.value);
    setRegisterData('brand', e.currentTarget.value);
    setCaffeineInfo(0);
  };

  // 선택한 커피 메뉴 정보 조회
  const getMenuInfo = (selectedMenu: string) => {
    const res = coffeeData?.[caffeineIntake.brand]?.filter(
      item => item.menu === selectedMenu
    );
    // caffeine Info Update
    const caffeine = res && res[0].caffeine;
    res && setCaffeineInfo(Number(caffeine));
  };

  // 커피 메뉴 선택
  const selectMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    getMenuInfo(e.currentTarget.value);
    setRegisterData('productName', e.currentTarget.value);
  };

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
