import { useRecoilValue } from 'recoil';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { BRANDLIST } from '@/constants/start';
import { authState } from '@/atoms/atoms';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium } from '@/styles/styles';
import { Column, Flex, Grid } from '@/styles/layout';
import RegisterLabel from '@/components/post/RegisterLabel';

const CoffeeMenuSelection = () => {
  const { postid } = useParams();
  const register = postid === 'register';

  const brandList = BRANDLIST;
  const { coffeeMenu } = CAFFEINE_FILTER_TEXTS;
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
      {!register && <span className={cx(Medium)}>{coffeeMenu.title}</span>}
      {/* 기능 구현시 data 형식이 확정후 map함수로 수정 예정 */}
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
              value={user.brand}
              disabled
              defaultValue={coffeeMenu.brand}
              hidden>
              {(user.brand && user.brand) || coffeeMenu.brand}
            </option>
            {brandList.map((item, idx) => (
              <option
                key={idx}
                value={item.brand}>
                {item.brand}
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
            {brandList.map((item, idx) => (
              <option
                key={idx}
                value={item.brand}>
                {item.brand}
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
