import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import RegisterLabel from '@/components/post/RegisterLabel';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { caffeineFilterState, registPostState } from '@/atoms/atoms';
import { CoffeeDataTypes } from '@/types/types';
import convertBrandName from '@/utils/convertBrandName';
import useGetCoffeeList from '@/hooks/useGetCoffeeList';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { SmStyle } from '@/styles/styles';
import { Column, Flex } from '@/styles/layout';

const { coffeeMenu } = CAFFEINE_FILTER_TEXTS;

const CoffeeMenuSelection = () => {
  const { postid } = useParams();
  const register = postid === 'register';
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);
  const setCaffeine = useSetRecoilState(caffeineFilterState);
  const coffeeData = useGetCoffeeList() as CoffeeDataTypes;
  const brandList = useGetCoffeeList('brand') as string[];

  const setRegisterData = (key: string, value: string | number) => {
    if (key === 'brand') {
      const newRegistData = {
        ...registInfo,
        [key]: value as string,
        menu: '',
        shot: 0,
        size: 'Regular'
      };
      setRegistInfo(newRegistData);
      return;
    }

    if (key === 'menu') {
      const newRegistData = {
        ...registInfo,
        [key]: value as string,
        shot: 0,
        size: 'Regular'
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
  const selectBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getMenuList(e.target.value);
    setRegisterData('brand', e.target.value);
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
  const selectMenu = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getMenuInfo(e.target.value);
    setRegisterData('menu', e.target.value);
  };

  return (
    <div className={MarginTop}>
      {!register && <span className={SmStyle}>{coffeeMenu.title}</span>}
      <CoffeeSelectContainer className={cx(register ? Column : Flex)}>
        {register && (
          <RegisterLabel
            label={coffeeMenu.brand}
            essential
          />
        )}
        <SelectBox className={registInfo.brand ? seletedBorder : defaultBorder}>
          <select
            className={cx(SelectInput, SmStyle)}
            name={coffeeMenu.brand}
            id={coffeeMenu.brand}
            value={registInfo.brand ? registInfo.brand : coffeeMenu.brand}
            onChange={selectBrand}>
            <option
              value={registInfo.brand ? registInfo.brand : coffeeMenu.brand}
              disabled
              defaultValue={coffeeMenu.brand}
              hidden>
              {registInfo.brand
                ? convertBrandName(registInfo.brand)
                : coffeeMenu.brand}
            </option>
            {brandList?.map(item => (
              <option
                key={item}
                value={item}>
                {convertBrandName(item)}
              </option>
            ))}
          </select>
        </SelectBox>
        {register && (
          <RegisterLabel
            label={coffeeMenu.menu}
            essential
          />
        )}
        <SelectBox className={registInfo.menu ? seletedBorder : defaultBorder}>
          <select
            className={cx(SelectInput, SmStyle)}
            name={coffeeMenu.menu}
            id={coffeeMenu.menu}
            value={registInfo.menu}
            onChange={selectMenu}>
            <option
              value=""
              disabled
              defaultValue={coffeeMenu.menu}
              hidden>
              {coffeeMenu.menu}
            </option>
            {menuList?.map(item => (
              <option
                key={item}
                value={item}>
                {item}
              </option>
            ))}
          </select>
        </SelectBox>
      </CoffeeSelectContainer>
    </div>
  );
};

const SelectBox = styled.div`
  width: 100%;
  height: 46px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: var(--font-sizes-sm);
  &:focus-within {
    border: 1px solid var(--colors-main);
  }
`;

const SelectInput = css`
  width: 100%;
  background-color: transparent;
  outline: none;
`;

const CoffeeSelectContainer = styled.div`
  margin: 6px 0 8px;
  gap: 8px;
`;

const MarginTop = css`
  padding-top: 12px;
`;

const defaultBorder = css`
  border: 1px solid #ccc;
  background-color: #fff;
`;

const seletedBorder = css`
  border: 1px solid var(--colors-main);
  background-color: #fff4ee;
`;

export default CoffeeMenuSelection;
