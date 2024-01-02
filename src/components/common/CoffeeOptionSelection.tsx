import { TouchEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { caffeineFilterState, registPostState } from '@/atoms/atoms';
import RegisterLabel from '@/components/post/RegisterLabel';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { BtnColorWhite, SmStyle, MarginB6, MarginB8 } from '@/styles/styles';
import { Align, Between, Column, Flex } from '@/styles/layout';

const { coffeeOption } = CAFFEINE_FILTER_TEXTS;

const CoffeeOptionSelection = () => {
  const { postid } = useParams();
  const register = postid === 'register';
  const size: string[] = ['Regular', 'Large', 'Venti'];
  const [inputValue, setInputValue] = useState(0);
  const [sizeValue, setSizeValue] = useState('Regular');
  const [caffeine, setCaffeine] = useRecoilState(caffeineFilterState);
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);

  const newRegistData = {
    ...registInfo,
    size: sizeValue,
    shot: inputValue + 1,
    caffeine: caffeine.caffeine
  };

  const largeSize = () => {
    setCaffeine({
      caffeine: Number(caffeine.caffeine) + 75,
      menuCaffeine: caffeine.menuCaffeine
    });
  };

  const VentiSize = () => {
    setCaffeine({
      caffeine: Number(caffeine.caffeine) + 150,
      menuCaffeine: caffeine.menuCaffeine
    });
  };

  const caffeineValue = Number(caffeine.caffeine);
  const menuCaffeineValue = Number(caffeine.menuCaffeine);

  const selectSize = (e: TouchEvent<HTMLButtonElement>) => {
    setSizeValue(e.currentTarget.value);
    const plusedCaffeine = caffeineValue - menuCaffeineValue;

    caffeineValue !== menuCaffeineValue &&
      setCaffeine({
        caffeine: caffeineValue - plusedCaffeine,
        menuCaffeine: menuCaffeineValue
      });
    setRegistInfo(newRegistData);
  };

  const selectMinusBtn = () => {
    inputValue >= 1 && setInputValue(inputValue - 1);
    inputValue >= 1 &&
      setCaffeine({
        caffeine: caffeineValue - 75,
        menuCaffeine: menuCaffeineValue
      });
    setRegistInfo(newRegistData);
  };

  const selectPlusBtn = () => {
    setInputValue(inputValue + 1);
    setCaffeine({
      caffeine: caffeineValue + 75,
      menuCaffeine: menuCaffeineValue
    });
    setRegistInfo(newRegistData);
  };

  useEffect(() => {
    sizeValue === 'Large' && largeSize();
    sizeValue === 'Venti' && VentiSize();
  }, [sizeValue]);

  useEffect(() => {
    setSizeValue(registInfo.size);
    setInputValue(registInfo.shot);
  }, []);

  return (
    <div className={cx(Column, SmStyle)}>
      <span className={MarginB6}>
        {!register ? (
          coffeeOption.size
        ) : (
          <RegisterLabel label={coffeeOption.size} />
        )}
      </span>
      <SizeBtnContainer className={cx(Flex, MarginB8)}>
        {size.map(item => (
          <Button
            key={item}
            value={item}
            text={item}
            onTouchEnd={selectSize}
            className={cx(
              sizeValue === item ? SelectSizeBtn : BtnColorWhite,
              SizeBtn,
              SmStyle
            )}
          />
        ))}
      </SizeBtnContainer>
      <span className={MarginB6}>
        {!register ? (
          coffeeOption.shot.title
        ) : (
          <RegisterLabel label={coffeeOption.shot.title} />
        )}
      </span>
      <ShotOptionInputContainer
        className={cx(Align, Between, MarginB8, SmStyle)}>
        <span>{coffeeOption.shot.input}</span>
        <div className={Align}>
          <Icon
            {...iconPropsGenerator(
              !inputValue ? 'input-minus' : 'input-minus:active'
            )}
            onTouchEnd={selectMinusBtn}
          />
          <ShotOptionInput
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
    </div>
  );
};

const ShotOptionInputContainer = styled.div`
  padding: 10px 16px;
  height: 46px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
`;
const ShotOptionInput = styled.input`
  text-align: center;
  width: 40px;
  background-color: transparent;
`;
const SizeBtnContainer = styled.div`
  gap: 4px;
`;
const SelectSizeBtn = css`
  border: 1px solid var(--colors-main);
  background-color: var(--colors-main);
  color: #fff !important;
`;
const SizeBtn = css`
  min-width: 104px;
  width: 100%;
  height: 40px;
  border-radius: 50px;
`;

export default CoffeeOptionSelection;
