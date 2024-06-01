import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import RegisterLabel from '@/components/post/RegisterLabel';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { caffeineFilterState, registPostState } from '@/atoms/atoms';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex } from '@/styles/layout';
import { BtnColorWhite, SmStyle, MarginB6, MarginB8 } from '@/styles/styles';

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
  const selectSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRegisterData('size', e.currentTarget.value);

    const size =
      e.currentTarget.value === 'Large'
        ? 75
        : e.currentTarget.value === 'Venti'
          ? 150
          : 0;

    setCaffeine({
      caffeine: menuCaffeineValue + size + registInfo.shot * 75,
      menuCaffeine: menuCaffeineValue
    });
  };

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
    registInfo.shot <= 5 && setRegisterData('shot', registInfo.shot + 1);
    registInfo.shot <= 5 &&
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
            onClick={selectSize}
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
            onClick={selectMinusBtn}
          />
          <ShotOptionInput
            type="number"
            value={registInfo.shot}
            readOnly
            disabled
          />
          <Icon
            {...iconPropsGenerator(
              registInfo.shot >= 5 ? 'input-plus' : 'input-plus:active'
            )}
            onClick={selectPlusBtn}
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
  color: var(--colors-main-dark);
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
