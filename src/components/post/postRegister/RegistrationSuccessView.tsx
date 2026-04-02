import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import dayjs from 'dayjs';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import FavoriteMenuAddModal from '@/components/post/postRegister/FavoriteMenuAddModal';

import { caffeineIntakeState, isModalState } from '@/atoms/atoms';
import { POST_REGISTER_TEXTS } from '@/constants/texts';
import { CAFFEINE_TEXTS, BUTTON_TEXTS } from '@/constants/common';
import { useShowFooter } from '@/hooks/useShowFooter';
import { brandMapToKor } from '@/utils/convertBrandName';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { customOptionFormmater } from '@/utils/customOptionFormmater';
import { useNavigateTo } from '@/hooks/useNavigateTo';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  Align,
  Between,
  Column,
  Flex,
  FlexCenter,
  Sticky
} from '@/styles/layout';
import {
  AddFavMenuBtn,
  Bold,
  BottomBtnContainer,
  LoginBtn,
  Medium,
  PostRegisterBtn,
  Regular,
  Semibold
} from '@/styles/styles';

const { recommendedCaffeine } = CAFFEINE_TEXTS;
const { heroText, description, coffeeOptionText } = POST_REGISTER_TEXTS.success;

const RegistrationSuccessView = () => {
  useShowFooter(false);
  const { caffeine, ...coffeeInfo } = useRecoilValue(caffeineIntakeState);
  const [isModal, setIsModal] = useRecoilState(isModalState);

  const { postId } = useParams();
  const postTypeCheck = postId !== 'caffeineIntake';

  const goToHome = useNavigateTo('0');
  const goToPost = useNavigateTo(`/post/${postId}`);

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

  const coffeeintakeValues = [
    brandMapToKor(coffeeInfoValues[0] as string),
    coffeeInfoValues[1],
    customOptionFormmater(customOption),
    registeredDay
  ];

  const coffeeIntakeEntries = coffeeOptionText.map((label, index) => ({
    label: label,
    value: coffeeintakeValues[index]
  }));

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const navToWhere = () => {
    postTypeCheck ? goToPost() : goToHome();
  };

  return (
    <>
      {isModal && (
        <FavoriteMenuAddModal
          handleModal={handleModal}
          contents={coffeeintakeValues}
        />
      )}
      <CaffeineInfoContainer className={cx(Column, Align)}>
        <Icon {...iconPropsGenerator(`register-success`, `41`)} />
        <HeroText className={Semibold}>
          <CaffeineInfo className={Bold}>
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
        {coffeeIntakeEntries.map((item, index) => (
          <CoffeeOptionItem className={cx(Flex, Between, Medium)}>
            <CoffeeOptionLabel className={Regular}>
              {item.label}
            </CoffeeOptionLabel>
            {!index ? (
              <span>{brandMapToKor(item.value as string)}</span>
            ) : (
              <span>{item.value}</span>
            )}
          </CoffeeOptionItem>
        ))}
      </CoffeeOptionContainer>
      <Button
        text={BUTTON_TEXTS.favoriteMenu}
        onClick={handleModal}
        className={cx(LoginBtn, AddFavMenuBtn, FlexCenter)}
      />
      <Toaster />
      <div className={BottomBtnContainer}>
        <Button
          text={postTypeCheck ? BUTTON_TEXTS.post : BUTTON_TEXTS.confirm}
          onClick={navToWhere}
          className={cx(PostRegisterBtn, Sticky)}
        />
      </div>
    </>
  );
};

const CaffeineInfoContainer = styled.div`
  margin-top: 30px;
  display: flex;
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
