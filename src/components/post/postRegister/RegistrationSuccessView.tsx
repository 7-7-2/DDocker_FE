import { useNavigate, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';

import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';
import ModalCTA from '@/components/common/ModalCTA';
import FavoriteMenuAddModal from '@/components/post/postRegister/FavoriteMenuAddModal';

import { useShowFooter } from '@/hooks/useShowFooter';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useSmartBack } from '@/hooks/useSmartBack';
import { useFavoriteMenu } from '@/hooks/post/useFavoriteMenu';
import { useResetRegistInfo } from '@/hooks/post/useResetRegistInfo';

import { brandMapToKor } from '@/utils/convertBrandName';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { coffeeInfoFormatter } from '@/utils/coffeeInfoFormatter';

import { caffeineIntakeState } from '@/atoms/atoms';
import { POST_REGISTER_TEXTS } from '@/constants/texts';
import { CAFFEINE_TEXTS, BUTTON_TEXTS } from '@/constants/common';

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
const { heroText, description, coffeeOptionText, addFavoriteMenu } =
  POST_REGISTER_TEXTS.success;

const RegistrationSuccessView = () => {
  useShowFooter(false);
  const caffeineIntake = useRecoilValue(caffeineIntakeState);
  const { caffeine, coffeeInfo } = coffeeInfoFormatter(caffeineIntake);
  const { isModal, setIsModal } = useVerifyModalCTA();

  // post type check
  const { postId } = useParams();
  const caffeineIntakePost = postId === 'caffeineIntake';

  // 확인 버튼
  const navigate = useNavigate();
  const { smartBack } = useSmartBack();
  const { resetRegistInfo } = useResetRegistInfo();
  const goToPost = () =>
    navigate(`/post/${postId}`, {
      state: { from: 'resgister' }
    });
  const navToWhere = () => {
    resetRegistInfo();
    !caffeineIntakePost ? goToPost() : smartBack();
  };

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
  const registeredDay = dayjs(new Date()).format('YYYY.MM.DD');
  const coffeeintakeValues = [...coffeeInfo, registeredDay];
  const coffeeIntakeEntries = coffeeOptionText.map((label, index) => ({
    label: label,
    value: coffeeintakeValues[index]
  }));

  // favorieMenu
  const { handleOnClick, isfailed, moveFavoriteTab } = useFavoriteMenu();
  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      {isModal && !isfailed ? (
        <FavoriteMenuAddModal
          handleModal={handleModal}
          handleOnclick={handleOnClick}
          contents={coffeeintakeValues}
        />
      ) : (
        <ModalCTA
          buttonText={[BUTTON_TEXTS.close, BUTTON_TEXTS.edit]}
          title={addFavoriteMenu.ModalText.max}
          description={addFavoriteMenu.description}
          fn={moveFavoriteTab}
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
          <CoffeeOptionItem
            key={item.label}
            className={cx(Flex, Between, Medium)}>
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
          text={!caffeineIntakePost ? BUTTON_TEXTS.post : BUTTON_TEXTS.confirm}
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
