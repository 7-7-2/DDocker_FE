import { TouchEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { BtnColorWhite, Medium } from '@/styles/styles';
import { Align, Between, Column, Flex } from '@/styles/layout';
import RegisterLabel from '@/components/post/RegisterLabel';

const { coffeeOption } = CAFFEINE_FILTER_TEXTS;

const CoffeeOptionSelection = () => {
  const { postid } = useParams();
  const register = postid === 'register';
  const size: string[] = ['Tall', 'Grande', 'Venti'];
  const [inputValue, setInputValue] = useState(0);
  const [sizeValue, setSizeValue] = useState('');

  const selectSize = (e: TouchEvent<HTMLButtonElement>) => {
    setSizeValue(e.currentTarget.value);
  };

  return (
    <Container className={cx(Column, Medium)}>
      <span className={BottomMargin6}>
        {!register ? (
          coffeeOption.size
        ) : (
          <RegisterLabel label={coffeeOption.size} />
        )}
      </span>
      <div className={cx(Flex, Between, BottomMargin8)}>
        {size.map(item => (
          <Button
            value={item}
            text={item}
            onTouchEnd={selectSize}
            className={cx(
              sizeValue === item ? SelectSizeBtn : BtnColorWhite,
              Medium,
              SizeBtn
            )}
          />
        ))}
      </div>
      <span className={BottomMargin6}>
        {!register ? (
          coffeeOption.shot.title
        ) : (
          <RegisterLabel label={coffeeOption.shot.title} />
        )}
      </span>
      <ShotOptionInputContainer
        className={cx(Flex, Align, Between, BottomMargin8)}>
        <span>{coffeeOption.shot.input}</span>
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
const SelectSizeBtn = css`
  background-color: var(--colors-main);
  color: #fff;
`;

const SizeBtn = css`
  min-width: 104px;
  height: 40px;
  border-radius: 50px;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;
export default CoffeeOptionSelection;
