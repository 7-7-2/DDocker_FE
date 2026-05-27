import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import RegisterLabel from '@/components/post/postRegister/RegisterLabel';
import RadioBtn from '@/components/common/RadioBtn';

import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useCoffeeSelection } from '@/hooks/useCoffeeSelection';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex } from '@/styles/layout';
import {
  BtnColorBorderWhite,
  SmStyle,
  CaffeineFilterHomeLabel,
  Medium,
  RegisterContentsStyle,
  HomeLabelStyle
} from '@/styles/styles';

const { coffeeOption } = CAFFEINE_FILTER_TEXTS;

const CoffeeOptionSelection = () => {
  const {
    brand,
    register,
    caffeineIntake,
    selectSize,
    selectIntensityOption,
    selectMinusBtn,
    selectPlusBtn,
    shotPlusBtnActive
  } = useCoffeeSelection();

  return (
    <div className={cx(Column, SmStyle)}>
      <div className={cx((register || brand) && RegisterContentsStyle)}>
        {!(register || brand) ? (
          <span className={CaffeineFilterHomeLabel}>{coffeeOption.size}</span>
        ) : (
          <RegisterLabel label={coffeeOption.size} />
        )}
        <SizeBtnContainer
          className={cx(!(register || brand) && HomeLabelStyle, Flex)}>
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
      </div>
      <div className={cx((register || brand) && RegisterContentsStyle)}>
        {!(register || brand) ? (
          <span className={CaffeineFilterHomeLabel}>
            {coffeeOption.shot.title}
          </span>
        ) : (
          <RegisterLabel label={coffeeOption.shot.title} />
        )}
        <div className={cx(!(register || brand) && HomeLabelStyle, Medium)}>
          <PersonalOptionContainer className={cx(Flex, Between)}>
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
                type="text"
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
      </div>
    </div>
  );
};

const PersonalOptionContainer = styled.div`
  padding: 12px 0;
  height: 52px;
  border-bottom: 1px solid var(--colors-border-grey);
  background: #fff;
`;
const ShotOptionInput = styled.input`
  width: 30px;
  text-align: center;
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

export default CoffeeOptionSelection;
