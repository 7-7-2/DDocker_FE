import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import RegisterLabel from '@/components/post/postRegister/RegisterLabel';
import RadioBtn from '@/components/common/RadioBtn';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { caffeineFilterState, caffeineIntakeState } from '@/atoms/atoms';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex } from '@/styles/layout';
import {
  BtnColorBorderWhite,
  SmStyle,
  MarginB8,
  CaffeineFilterHomeLabel,
  Medium
} from '@/styles/styles';

const { coffeeOption } = CAFFEINE_FILTER_TEXTS;

const CoffeeOptionSelection = () => {
  const { postId } = useParams();
  const { type } = useParams();

  const register = postId === 'register' || type === 'update';

  const [caffeine, setCaffeine] = useRecoilState(caffeineFilterState);
  const [caffeineIntake, setCaffeineIntake] =
    useRecoilState(caffeineIntakeState);

  const caffeineValue = caffeine.caffeine;
  const menuCaffeineValue = caffeine.menuCaffeine;
  const mild = caffeineIntake.intensity === coffeeOption.intensityOption[0];

  const setRegisterData = (key: string, value: string | number) => {
    let newRegistData;
    if (key === 'intensity' && value === coffeeOption.intensityOption[0]) {
      newRegistData = {
        ...caffeineIntake,
        shot: 0,
        [key]: value
      };
    } else {
      newRegistData = {
        ...caffeineIntake,
        [key]: value
      };
    }
    setCaffeineIntake(newRegistData);
  };

  // set coffee size info
  const selectSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRegisterData('size', e.currentTarget.value);
    const size =
      caffeineIntake.productName &&
      e.currentTarget.value === coffeeOption.sizeOption[1]
        ? 75
        : caffeineIntake.productName &&
            e.currentTarget.value === coffeeOption.sizeOption[2]
          ? 150
          : 0;

    setCaffeine({
      caffeine:
        menuCaffeineValue + size + caffeineIntake.shot * 75 - (mild ? 75 : 0),
      menuCaffeine: menuCaffeineValue
    });
  };

  // set personal options
  const selectIntensityOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    const size =
      caffeineIntake.size === coffeeOption.sizeOption[1]
        ? 75
        : caffeineIntake.size === coffeeOption.sizeOption[2]
          ? 150
          : 0;
    setRegisterData('intensity', e.currentTarget.value);

    setCaffeine({
      caffeine:
        caffeineIntake.productName &&
        e.currentTarget.value === coffeeOption.intensityOption[0]
          ? menuCaffeineValue + size - 75
          : menuCaffeineValue + size,
      menuCaffeine: menuCaffeineValue
    });
  };

  const selectMinusBtn = () => {
    const isValid = caffeineIntake.productName && caffeineIntake.shot >= 1;
    isValid && setRegisterData('shot', caffeineIntake.shot - 1);
    isValid &&
      setCaffeine({
        caffeine: caffeineValue - 75,
        menuCaffeine: menuCaffeineValue
      });
  };

  const selectPlusBtn = () => {
    const isValid =
      caffeineIntake.productName && !mild && caffeineIntake.shot < 6;
    isValid && setRegisterData('shot', caffeineIntake.shot + 1);
    isValid &&
      setCaffeine({
        caffeine: caffeineValue + 75,
        menuCaffeine: menuCaffeineValue
      });
  };

  const shotPlusBtnActive =
    !caffeineIntake.productName || mild || caffeineIntake.shot >= 6;

  return (
    <div className={cx(Column, SmStyle)}>
      <span className={CaffeineFilterHomeLabel}>
        {!register ? (
          coffeeOption.size
        ) : (
          <RegisterLabel label={coffeeOption.size} />
        )}
      </span>
      <SizeBtnContainer className={cx(Flex, MarginB8)}>
        {coffeeOption.sizeOption.map(item => (
          <Button
            key={item}
            value={item}
            text={item}
            onClick={selectSize}
            className={cx(
              caffeineIntake.size === item
                ? SelectSizeBtn
                : BtnColorBorderWhite,
              SizeBtn,
              SmStyle
            )}
          />
        ))}
      </SizeBtnContainer>
      <span className={CaffeineFilterHomeLabel}>
        {!register ? (
          coffeeOption.shot.title
        ) : (
          <RegisterLabel label={coffeeOption.shot.title} />
        )}
      </span>
      <PersonalOptionContainer className={cx(Flex, Between, Medium)}>
        <span>{coffeeOption.shot.intensity}</span>
        <OptionInterface className={Flex}>
          {coffeeOption.intensityOption.map(item => (
            <IntensityOptionItem
              key={item}
              className={cx(Flex, Align)}>
              <RadioBtn
                option={item}
                selectedOption={caffeineIntake.intensity}
                selectIntensityOption={selectIntensityOption}
              />
            </IntensityOptionItem>
          ))}
        </OptionInterface>
      </PersonalOptionContainer>
      <PersonalOptionContainer className={cx(Align, Between, Medium)}>
        <span>{coffeeOption.shot.input}</span>
        <OptionInterface className={Align}>
          <Icon
            {...iconPropsGenerator(
              !caffeineIntake.shot ? 'input-minus' : 'input-minus:active'
            )}
            onClick={selectMinusBtn}
          />
          <ShotOptionInput
            type="number"
            value={caffeineIntake.shot}
            readOnly
          />
          <Icon
            {...iconPropsGenerator(
              shotPlusBtnActive ? 'input-plus' : 'input-plus:active'
            )}
            onClick={selectPlusBtn}
          />
        </OptionInterface>
      </PersonalOptionContainer>
    </div>
  );
};

const PersonalOptionContainer = styled.div`
  padding: 12px 0;
  height: 46px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--colors-border-grey);
  background: #fff;
`;
const ShotOptionInput = styled.input`
  text-align: center;
  width: 10px;
  background-color: transparent;
  color: var(--colors-main-dark);
  font-size: var(--font-sizes-base);
`;
const SizeBtnContainer = styled.div`
  gap: 4px;
`;

const OptionInterface = styled.div`
  width: 126px;
  justify-content: space-between;
`;

const IntensityOptionItem = styled.div`
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

const RadioBtnColor = css`
  border: 1px solid var(--colors-btn-grey);
  &:focus-within {
    border: 1px solid var(--colors-main);
  }
`;

export default CoffeeOptionSelection;
