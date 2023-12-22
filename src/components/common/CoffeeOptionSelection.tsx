import { TouchEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { BtnColorWhite, Medium } from '@/styles/styles';
import { Align, Between, Column, Flex, Grid } from '@/styles/layout';
import RegisterLabel from '@/components/post/RegisterLabel';
import { caffeineFilterState } from '@/atoms/atoms';
import { useRecoilState } from 'recoil';

const { coffeeOption } = CAFFEINE_FILTER_TEXTS;

const CoffeeOptionSelection = () => {
  const { postid } = useParams();
  const register = postid === 'register';
  const size: string[] = ['Regular', 'Large', 'Venti'];
  const [inputValue, setInputValue] = useState(0);
  const [sizeValue, setSizeValue] = useState('Regular');
  const [caffeine, setCaffeine] = useRecoilState(caffeineFilterState);
  // const [registInfo, setRegistInfo] = useRecoilState(registPostState);

  const largeSize = () => {
    setCaffeine({
      caffeine: String(Number(caffeine.caffeine) + 75),
      menuCaffeine: caffeine.menuCaffeine
    });
  };
  const VentiSize = () => {
    setCaffeine({
      caffeine: String(Number(caffeine.caffeine) + 150),
      menuCaffeine: caffeine.menuCaffeine
    });
  };

  const selectSize = (e: TouchEvent<HTMLButtonElement>) => {
    setSizeValue(e.currentTarget.value);

    const plusCaffeine =
      Number(caffeine.caffeine) - Number(caffeine.menuCaffeine);

    caffeine.caffeine !== caffeine.menuCaffeine &&
      setCaffeine({
        caffeine: String(Number(caffeine.caffeine) - plusCaffeine),
        menuCaffeine: caffeine.menuCaffeine
      });
  };

  const selectMinusBtn = () => {
    inputValue >= 1 && setInputValue(inputValue - 1);
    inputValue >= 1 &&
      setCaffeine({
        caffeine: String(Number(caffeine.caffeine) - 75),
        menuCaffeine: caffeine.menuCaffeine
      });
  };

  const selectPlusBtn = () => {
    setInputValue(inputValue + 1);
    setCaffeine({
      caffeine: String(Number(caffeine.caffeine) + 75),
      menuCaffeine: caffeine.menuCaffeine
    });
  };

  useEffect(() => {
    sizeValue === 'Large' && largeSize();
    sizeValue === 'Venti' && VentiSize();
  }, [sizeValue]);

  return (
    <Container className={cx(Column, Medium)}>
      <span className={BottomMargin6}>
        {!register ? (
          coffeeOption.size
        ) : (
          <RegisterLabel label={coffeeOption.size} />
        )}
      </span>
      <SizeBtnContainer className={cx(Flex, Grid, BottomMargin8)}>
        {size.map(item => (
          <Button
            key={item}
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
      </SizeBtnContainer>
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
            onTouchEnd={selectMinusBtn}
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
            onTouchEnd={selectPlusBtn}
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

const SizeBtnContainer = styled.div`
  gap: 4px;
`;

const SelectSizeBtn = css`
  border: 1px solid var(--colors-main);
  background-color: var(--colors-main);
  color: #fff;
`;

const SizeBtn = css`
  min-width: 104px;
  width: 100%;
  height: 40px;
  border-radius: 50px;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

export default CoffeeOptionSelection;
