import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';

import { caffeineIntakeState } from '@/atoms/atoms';
import { POST_REGISTER_TEXTS } from '@/constants/texts';
import { CAFFEINE_TEXTS, BUTTON_TEXTS } from '@/constants/common';
import { useShowFooter } from '@/hooks/useShowFooter';
import { brandMapToKor } from '@/utils/convertBrandName';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import {
  Align,
  Between,
  Column,
  Flex,
  FlexCenter,
  Stiky
} from '@/styles/layout';
import {
  AddFavMenuBtn,
  LoginBtn,
  Medium,
  PostRegisterBtn,
  Regular,
  Semibold
} from '@/styles/styles';

const { recommendedCaffeine } = CAFFEINE_TEXTS;
const { favoriteMenu, confirm } = BUTTON_TEXTS;
const { heroText, description, coffeeOptionText } = POST_REGISTER_TEXTS.success;

const RegistrationSuccessView = () => {
  useShowFooter(false);
  const { caffeine, ...coffeeInfo } = useRecoilValue(caffeineIntakeState);

  // descriptionText 가공
  const generateDescriptionText = () => {
    if (caffeine <= recommendedCaffeine) {
      const sum = recommendedCaffeine - caffeine;
      const { prefix, suffix } = description.recommend;
      return { sum, prefix, suffix };
    }
    const sum = caffeine - recommendedCaffeine;
    const { prefix, suffix } = description.excessive;
    return { sum, prefix, suffix };
  };
  const { sum, prefix, suffix } = generateDescriptionText();
  const descriptionText = `${prefix} ${sum}${description.unit} ${suffix}`;

  // coffeeInfo
  const coffeeInfoValues = Object.values(coffeeInfo);
  const customOption = coffeeInfoValues.slice(2, 5);
  const registeredDay = dayjs(new Date()).format('YYYY.MM.DD');

  const customOptionValue = (customOption: Array<string | number>) => {
    const shotText = `+${customOption.length - 1}샷`;
    return customOption.map((item, index) => (
      <>{index !== 2 ? <span>{item}, </span> : <span>{shotText}</span>}</>
    ));
  };

  const coffeeintakeValues = [
    ...coffeeInfoValues.slice(0, 2),
    customOption,
    registeredDay
  ];

  const coffeeIntakeEntries = coffeeOptionText.map((label, index) => ({
    label: label,
    value: coffeeintakeValues[index]
  }));

  const addFavoriteMenu = () => {
    console.log('등록');
  };

  const navToHome = () => {
    console.log('나가기');
  };

  return (
    <>
      <Container>
        <CaffeineInfoContainer className={cx(Column, Align)}>
          <Icon {...iconPropsGenerator(`register-success`, `41`)} />
          <HeroText className={cx(Semibold)}>
            <CaffeineInfo>
              {heroText.prefix}
              {caffeine}
              {heroText.suffix}
            </CaffeineInfo>
            {heroText.text}
          </HeroText>
          <Description className={Regular}>
            {description.prefix}
            {descriptionText}
          </Description>
        </CaffeineInfoContainer>
        <CoffeeOptionContainer className={cx(Flex, Column)}>
          <div></div>
          {coffeeIntakeEntries.map((item, index) => (
            <CoffeeOptionItem className={cx(Flex, Between, Medium)}>
              <CoffeeOptionLabel className={Regular}>
                {item.label}
              </CoffeeOptionLabel>
              {!index ? (
                <span>{brandMapToKor(item.value as string)}</span>
              ) : Array.isArray(item.value) ? (
                <span>{customOptionValue(item.value)}</span>
              ) : (
                <span>{item.value}</span>
              )}
            </CoffeeOptionItem>
          ))}
        </CoffeeOptionContainer>
        <Button
          text={favoriteMenu}
          onClick={addFavoriteMenu}
          className={cx(LoginBtn, AddFavMenuBtn, FlexCenter)}
        />
      </Container>
      <Button
        text={confirm}
        onClick={navToHome}
        className={cx(PostRegisterBtn, Stiky)}
      />
    </>
  );
};

const Container = styled.div`
  height: 100vh;
`;

const CaffeineInfoContainer = styled.div`
  margin-top: 30px;
`;

const HeroText = styled.span`
  font-size: var(--font-sizes-xxl);
  line-height: 32px;
  text-align: center;
  margin: 24px 0 10px;
`;

const Description = styled.span`
  line-height: 19px;
  color: var(--colors-mid-grey);
  margin-bottom: 30px;
`;

const CaffeineInfo = styled.div`
  color: var(--colors-main);
`;

const CoffeeOptionContainer = styled.div`
  border-top: 1px;
  border-bottom: 1px;
  border-style: solid;
  border-color: var(--colors-border-grey);
  padding: 16px 0;
  gap: 10px;
  margin-bottom: 40px;
`;

const CoffeeOptionItem = styled.div`
  line-height: 22px;
  font-size: var(--font-sizes-sm);
  color: var(--colors-main-dark);
`;

const CoffeeOptionLabel = styled.span`
  color: var(--colors-mid-grey);
`;

export default RegistrationSuccessView;
