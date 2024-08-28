import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import RegisterLabel from '@/components/post/RegisterLabel';
import RadioBtn from '@/components/common/RadioBtn';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { caffeineFilterState, registPostState } from '@/atoms/atoms';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex } from '@/styles/layout';
import {
  BtnColorWhite,
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
  const size: string[] = ['Regular', 'Large', 'Venti'];

  const [caffeine, setCaffeine] = useRecoilState(caffeineFilterState);
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);

  const caffeineValue = caffeine.caffeine;
  const menuCaffeineValue = caffeine.menuCaffeine;
  const mild = registInfo.intensity === coffeeOption.intensityOption[0];

  const setRegisterData = (key: string, value: string | number) => {
    let newRegistData;
    if (key === 'intensity' && value === coffeeOption.intensityOption[0]) {
      newRegistData = {
        ...registInfo,
        shot: 0,
        [key]: value
      };
    } else {
      newRegistData = {
        ...registInfo,
        [key]: value
      };
    }
    setRegistInfo(newRegistData);
  };

  // set coffee size info
  const selectSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRegisterData('size', e.currentTarget.value);
    const size =
      registInfo.menu && e.currentTarget.value === 'Large'
        ? 75
        : registInfo.menu && e.currentTarget.value === 'Venti'
          ? 150
          : 0;

    setCaffeine({
      caffeine:
        menuCaffeineValue + size + registInfo.shot * 75 - (mild ? 75 : 0),
      menuCaffeine: menuCaffeineValue
    });
  };

  // set personal options
  const selectIntensityOption = (e: React.ChangeEvent<HTMLElement>) => {
    const size =
      registInfo.size === 'Large' ? 75 : registInfo.size === 'Venti' ? 150 : 0;
    setRegisterData('intensity', e.currentTarget.id);

    setCaffeine({
      caffeine:
        registInfo.menu &&
        e.currentTarget.id === coffeeOption.intensityOption[0]
          ? menuCaffeineValue + size - 75
          : menuCaffeineValue + size,
      menuCaffeine: menuCaffeineValue
    });
  };

  const selectMinusBtn = () => {
    const isValid = registInfo.menu && registInfo.shot >= 1;
    isValid && setRegisterData('shot', registInfo.shot - 1);
    isValid &&
      setCaffeine({
        caffeine: caffeineValue - 75,
        menuCaffeine: menuCaffeineValue
      });
  };

  const selectPlusBtn = () => {
    const isValid = registInfo.menu && !mild && registInfo.shot <= 5;
    isValid && setRegisterData('shot', registInfo.shot + 1);
    isValid &&
      setCaffeine({
        caffeine: caffeineValue + 75,
        menuCaffeine: menuCaffeineValue
      });
  };

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
      <span className={CaffeineFilterHomeLabel}>
        {!register ? (
          coffeeOption.shot.title
        ) : (
          <RegisterLabel label={coffeeOption.shot.title} />
        )}
      </span>
      <PersonalOptionContainer className={cx(Flex, Between, Medium)}>
        <span>{coffeeOption.shot.intensity}</span>
        <div className={Flex}>
          {coffeeOption.intensityOption.map(item => (
            <IntensityOptionItem
              key={item}
              className={cx(Flex, Align)}>
              <RadioBtn
                selectedOption={registInfo.intensity}
                color="main"
                className={RadioBtnColor}
                id={item}
                fn={selectIntensityOption}
              />
            </IntensityOptionItem>
          ))}
        </div>
      </PersonalOptionContainer>
      <PersonalOptionContainer className={cx(Align, Between, Medium)}>
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
          />
          <Icon
            {...iconPropsGenerator(
              !registInfo.menu || mild || registInfo.shot >= 5
                ? 'input-plus'
                : 'input-plus:active'
            )}
            onClick={selectPlusBtn}
          />
        </div>
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
  width: 40px;
  background-color: transparent;
  color: var(--colors-main-dark);
  font-size: var(--font-sizes-base);
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
const IntensityOptionItem = styled.div`
  gap: 4px;
  margin-left: 20px;
`;
const RadioBtnColor = css`
  border: 1px solid var(--colors-btn-grey);
  &:focus-within {
    border: 1px solid var(--colors-main);
  }
`;

export default CoffeeOptionSelection;
