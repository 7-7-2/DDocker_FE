import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import RegisterLabel from '@/components/post/RegisterLabel';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { caffeineFilterState, registPostState } from '@/atoms/atoms';
import { CoffeeDataTypes } from '@/types/types';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { CaffeineFilterHomeLabel } from '@/styles/styles';
import { Column, Grid } from '@/styles/layout';

const { coffeeMenu } = CAFFEINE_FILTER_TEXTS;
const SelectBox = lazy(() => import('@/components/common/SelectBox'));

const CoffeeMenuSelection = () => {
  const { postId } = useParams();
  const { type } = useParams();
  const register = postId === 'register' || type === 'update';
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);
  const setCaffeine = useSetRecoilState(caffeineFilterState);
  const coffeeData = useGetCoffeeList() as CoffeeDataTypes;
  const brandList = useGetCoffeeList('brand') as string[];

  const setRegisterData = (key: string, value: string | number) => {
    if (key === 'brand') {
      const newRegistData = {
        ...registInfo,
        [key]: value as string,
        menu: ''
      };
      setRegistInfo(newRegistData);
      return;
    }

    if (key === 'menu') {
      const newRegistData = {
        ...registInfo,
        [key]: value as string,
        shot: 0,
        size: 'Regular',
        intensity: '기본'
      };
      setRegistInfo(newRegistData);
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
  const menuList = coffeeData && getMenuList(registInfo.brand);

  // 커피 브랜드 선택
  const selectBrand = (e: React.MouseEvent<HTMLButtonElement>) => {
    getMenuList(e.currentTarget.value);
    setRegisterData('brand', e.currentTarget.value);
    setCaffeineInfo(0);
  };

  // 선택한 커피 메뉴 정보 조회
  const getMenuInfo = (selectedMenu: string) => {
    const res = coffeeData?.[registInfo.brand]?.filter(
      item => item.menu === selectedMenu
    );
    // caffeine Info Update
    const caffeine = res && res[0].caffeine;
    res && setCaffeineInfo(Number(caffeine));
  };

  // 커피 메뉴 선택
  const selectMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    getMenuInfo(e.currentTarget.value);
    setRegisterData('menu', e.currentTarget.value);
  };

  return (
    <div className={MarginTop}>
      {!register && (
        <span className={CaffeineFilterHomeLabel}>{coffeeMenu.title}</span>
      )}
      <CoffeeSelectContainer className={cx(register ? Column : Grid)}>
        <Suspense>
          {register && (
            <RegisterLabel
              label={coffeeMenu.brand}
              essential
            />
          )}
          <SelectBox
            value={registInfo.brand}
            defaultValue={registInfo.brand || coffeeMenu.brand}
            data={brandList}
            onClick={selectBrand}
          />
          {register && (
            <RegisterLabel
              label={coffeeMenu.menu}
              essential
            />
          )}
          <SelectBox
            value={registInfo.menu}
            defaultValue={coffeeMenu.menu}
            data={menuList}
            onClick={selectMenu}
          />
        </Suspense>
      </CoffeeSelectContainer>
    </div>
  );
};

const CoffeeSelectContainer = styled.div`
  position: relative;
  margin: 6px 0 8px;
  gap: 8px;
  grid-template-columns: calc(50% - 4px) calc(50% - 4px);
`;

const MarginTop = css`
  padding-top: 12px;
`;

export default CoffeeMenuSelection;
