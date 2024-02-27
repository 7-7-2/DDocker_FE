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
  const [caffeine, setCaffeine] = useRecoilState(caffeineFilterState);
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);

  const caffeineValue = caffeine.caffeine;
  const menuCaffeineValue = caffeine.menuCaffeine;

  const setRegisterData = (key: string, value: string | number) => {
    const newRegistData = {
      ...registInfo,
      [key]: value
    };
    setRegistInfo(newRegistData);
  };

  // set coffee size info
  const largeSize = () => {
    setCaffeine({
      caffeine: caffeineValue + 75,
      menuCaffeine: menuCaffeineValue
    });
  };

  const VentiSize = () => {
    setCaffeine({
      caffeine: caffeineValue + 150,
      menuCaffeine: menuCaffeineValue
    });
  };

  const selectSize = (e: TouchEvent<HTMLButtonElement>) => {
    setRegisterData('size', e.currentTarget.value);

    // size/shot 변경으로 추가된 caffeine
    const plusedCaffeine = caffeineValue - menuCaffeineValue;

    registInfo.size !== 'Regular' &&
      setCaffeine({
        // size 변경 시 기본 caffiene reset 후 추가된 shot을 더해주는 식
        caffeine: caffeineValue - plusedCaffeine + registInfo.shot * 75,
        menuCaffeine: menuCaffeineValue
      });
  };

  useEffect(() => {
    registInfo.size === 'Large' && largeSize();
    registInfo.size === 'Venti' && VentiSize();
  }, [registInfo.size]);

  // set coffee shot info
  const selectMinusBtn = () => {
    registInfo.shot >= 1 && setRegisterData('shot', registInfo.shot - 1);
    registInfo.shot >= 1 &&
      setCaffeine({
        caffeine: caffeineValue - 75,
        menuCaffeine: menuCaffeineValue
      });
  };

  const selectPlusBtn = () => {
    setRegisterData('shot', registInfo.shot + 1);
    setCaffeine({
      caffeine: caffeineValue + 75,
      menuCaffeine: menuCaffeineValue
    });
  };

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
              registInfo.size === item ? SelectSizeBtn : BtnColorWhite,
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
              !registInfo.shot ? 'input-minus' : 'input-minus:active'
            )}
            onTouchEnd={selectMinusBtn}
          />
          <ShotOptionInput
            type="number"
            value={registInfo.shot}
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
