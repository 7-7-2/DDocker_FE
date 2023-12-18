import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { Align, Between, Column, Flex, Grid } from '@/styles/layout';
import { LoginBtn, Medium, SizeBtn } from '@/styles/styles';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useState } from 'react';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const CoffeeOptionSelection = () => {
  const size: string[] = ['Tall', 'Grande', 'Venti'];
  const [inputValue, setInputValue] = useState(0);

  return (
    <Container className={cx(Column, Medium)}>
      <span className={BottomMargin6}>사이즈</span>
      <div className={cx(Flex, Between, BottomMargin8)}>
        {size.map(item => (
          <Button
            text={item}
            onTouchEnd={() => {
              console.log('size');
            }}
            className={SizeBtn}
          />
        ))}
      </div>
      <span className={BottomMargin6}>추가선택</span>
      <ShotOptionInputContainer
        className={cx(Flex, Align, Between, BottomMargin8)}>
        <span>샷 추가</span>
        <div className={cx(Flex, Align)}>
          <Icon
            {...iconPropsGenerator(
              !inputValue ? 'input-minus' : 'input-minus:active'
            )}
            onTouchEnd={() => {
              inputValue >= 1 && setInputValue(inputValue - 1);
            }}
          />
          <ShotOptionInput
            className={Medium}
            type="number"
            value={inputValue}
            readOnly
            disabled
          />
          <Icon
            {...iconPropsGenerator('input-plus')}
            onTouchEnd={() => {
              setInputValue(inputValue + 1);
            }}
          />
        </div>
      </ShotOptionInputContainer>
    </Container>
  );
};

const ShotOptionInputContainer = styled.div`
  padding: 10px 16px;
  height: 46px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
  color: #313131;
  font-size: var(--font-sizes-sm);
`;

const ShotOptionInput = styled.input`
  text-align: center;
  width: 40px;
`;

const Container = styled.div`
  color: #313131;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;
const BottomMargin6 = css`
  margin-bottom: 6px;
`;
const BottomMargin8 = css`
  margin-bottom: 8px;
`;

export default CoffeeOptionSelection;
