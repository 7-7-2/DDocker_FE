import { useRecoilValue } from 'recoil';
import { ChangeEvent, useState } from 'react';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { BRANDLIST } from '@/constants/start';
import { authState } from '@/atoms/atoms';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium } from '@/styles/styles';
import { Flex, Grid } from '@/styles/layout';

const CoffeeMenuSelection = () => {
  const brandList = BRANDLIST;
  const { coffeeMenuSelection } = CAFFEINE_FILTER_TEXTS;
  const { user } = useRecoilValue(authState);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');

  const selectBrand = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  };

  const selectMenu = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMenu(e.target.value);
  };

  return (
    <div className={MarginTop}>
      <span className={cx(Medium)}>{coffeeMenuSelection.title}</span>
      <CoffeeSelectContainer className={cx(Flex, Grid)}>
        <SelectBox className={selectedMenu ? seletedBorder : defaultBorder}>
          <select
            className={cx(SelectInput, Medium)}
            name={coffeeMenuSelection.brand}
            id={coffeeMenuSelection.brand}
            value={selectedBrand}
            onChange={selectBrand}>
            <option
              value={user.brand}
              disabled
              selected
              hidden>
              {(user.brand && user.brand) || coffeeMenuSelection.brand}
            </option>
            {brandList.map(item => (
              <option value={item.brand}>{item.brand}</option>
            ))}
          </select>
        </SelectBox>
        <SelectBox className={selectedMenu ? seletedBorder : defaultBorder}>
          <select
            className={cx(SelectInput, Medium)}
            name={coffeeMenuSelection.menu}
            id={coffeeMenuSelection.menu}
            value={selectedMenu}
            onChange={selectMenu}>
            <option
              value=""
              disabled
              selected
              hidden>
              {coffeeMenuSelection.menu}
            </option>
            {brandList.map(item => (
              <option value={item.brand}>{item.brand}</option>
            ))}
          </select>
        </SelectBox>
      </CoffeeSelectContainer>
    </div>
  );
};

const SelectBox = styled.div`
  width: 164px;
  height: 46px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
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
  margin-top: 12px;
`;

const defaultBorder = css`
  border: 1px solid #ccc;
  background: #fff;
`;

const seletedBorder = css`
  border: 1px solid var(--colors-main);
  background: #fff4ee;
`;

export default CoffeeMenuSelection;
