import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import RegisterLabel from '@/components/post/RegisterLabel';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import useGetCacheData from '@/hooks/useGetCacheData';
import { CoffeeData, UserCachedData } from '@/types/types';
import coffeeData from '@/datas/coffees';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium } from '@/styles/styles';
import { Column, Flex, Grid } from '@/styles/layout';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  registPostState,
  selectedBrandState,
  selectedMenuInfoState,
  selectedMenuState,
  userInfoState
} from '@/atoms/atoms';

const { coffeeMenu } = CAFFEINE_FILTER_TEXTS;

const CoffeeMenuSelection = () => {
  const { postid } = useParams();
  const register = postid === 'register';
  const [cachedUser, setCachedUser] = useState<UserCachedData>();
  const [selectedBrand, setSelectedBrand] = useRecoilState(selectedBrandState);
  const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);
  const setSelectedMenuInfo = useSetRecoilState(selectedMenuInfoState);
  const [menuList, setMenuList] = useState<string[]>([]);
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);

  const newRegistData = {
    ...registInfo,
    brand: selectedBrand,
    name: selectedMenu
  };

  useEffect(() => {
    getCachedUserInfo();
  }, []);

  const getCachedUserInfo = async () => {
    try {
      const data = await useGetCacheData('user', '/user');
      setCachedUser(data);
      setSelectedBrand(data.cacheData.user.brand);
      getMenuList(data.cacheData.user.brand);
    } catch (error) {
      console.error(error);
    }
  };

  const user = cachedUser?.cacheData.user;

  const setbrnadList = () => {
    const list = Object.keys(coffeeData);
    return list;
  };

  const brandList = setbrnadList();

  const selectedBrandData: CoffeeData = coffeeData;

  const getMenuList = (selectedBrand: string) => {
    const selectedBrandMenu =
      selectedBrandData[selectedBrand]?.map(item => item.name) || [];
    setMenuList(selectedBrandMenu);
  };

  const getMenuInfo = (selectedMenu: string) => {
    const selectedCaffeineInfo = selectedBrandData[selectedBrand]?.filter(
      item => item.name === selectedMenu
    );
    setSelectedMenuInfo(selectedCaffeineInfo[0]);
  };

  const selectBrand = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    getMenuList(e.target.value);
    setSelectedMenu('');
    setRegistInfo(newRegistData);
  };

  const selectMenu = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMenu(e.target.value);
    getMenuInfo(e.target.value);
    setRegistInfo(newRegistData);
  };

  return (
    <div className={MarginTop}>
      {!register && <span className={cx(Medium)}>{coffeeMenu.title}</span>}
      <CoffeeSelectContainer className={cx(register ? Column : Flex, Grid)}>
        {register && (
          <RegisterLabel
            label={coffeeMenu.brand}
            essential
          />
        )}
        <SelectBox className={selectedBrand ? seletedBorder : defaultBorder}>
          <select
            className={cx(SelectInput, Medium)}
            name={coffeeMenu.brand}
            id={coffeeMenu.brand}
            value={selectedBrand}
            onChange={selectBrand}>
            <option
              value={selectedBrand ? user?.brand : coffeeMenu.brand}
              disabled
              defaultValue={coffeeMenu.brand}
              hidden>
              {selectedBrand ? user?.brand : coffeeMenu.brand}
            </option>
            {brandList.map((item, idx) => (
              <option
                key={idx}
                value={item}>
                {item}
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
        <SelectBox className={selectedMenu ? seletedBorder : defaultBorder}>
          <select
            className={cx(SelectInput, Medium)}
            name={coffeeMenu.menu}
            id={coffeeMenu.menu}
            value={selectedMenu}
            onChange={selectMenu}>
            <option
              value=""
              disabled
              defaultValue={coffeeMenu.menu}
              hidden>
              {coffeeMenu.menu}
            </option>
            {menuList.map((item, idx) => (
              <option
                key={idx}
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
