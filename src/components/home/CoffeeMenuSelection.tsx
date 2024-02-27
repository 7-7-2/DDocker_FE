import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import RegisterLabel from '@/components/post/RegisterLabel';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import useGetCacheData from '@/hooks/useGetCacheData';
import { caffeineFilterState, registPostState } from '@/atoms/atoms';
import { CoffeeData } from '@/types/types';
import convertBrandName from '@/utils/convertBrandName';
import { setBrnadList } from '@/utils/setBrandList';

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
  const [cachedMenu, setCachedMenu] = useState<CoffeeData>();

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

    const newRegistData = {
      ...registInfo,
      [key]: value
    };

    setRegistInfo(newRegistData);
  };

  const setCaffeineInfo = (caffeinie: number) => {
    setCaffeine({
      caffeine: caffeinie,
      menuCaffeine: caffeinie
    });
  };

  const getCachedData = async () => {
    try {
      const userData = await useGetCacheData('user', '/userInfo');
      const coffeeData = await useGetCacheData('brand', '/coffeeMenu');
      setCachedMenu(coffeeData.cacheData);
      if (userData && registInfo.brand === '') {
        setRegisterData('brand', userData.cacheData.data.brand);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMenuList = (selectedBrand: string) => {
    const res = cachedMenu?.[selectedBrand]?.map(item => item.menu);
    return res;
  };

  const brandList = cachedMenu && setBrnadList(cachedMenu);
  const menuList = cachedMenu && getMenuList(registInfo.brand);

  const getMenuInfo = (selectedMenu: string) => {
    const res = cachedMenu?.[registInfo.brand]?.filter(
      item => item.menu === selectedMenu
    );

    // caffeine Info Update
    res && setCaffeineInfo(Number(res[0].caffeine));
    res && setRegisterData('caffeine', Number(res[0].caffeine));
  };

  useLayoutEffect(() => {
    getCachedData();
  }, []);

  const selectBrand = (e: ChangeEvent<HTMLSelectElement>) => {
    getMenuList(e.target.value);
    setRegisterData('brand', e.target.value);
    setCaffeineInfo(0);
  };

  const selectMenu = (e: ChangeEvent<HTMLSelectElement>) => {
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
            value={registInfo.brand || coffeeMenu.brand}
            onChange={selectBrand}>
            <option
              value={registInfo.brand || coffeeMenu.brand}
              disabled
              defaultValue={coffeeMenu.brand}
              hidden>
              {convertBrandName(registInfo.brand) || coffeeMenu.brand}
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
