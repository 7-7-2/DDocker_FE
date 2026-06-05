import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useSmartBack } from '@/hooks/useSmartBack';
import { useFavoriteMenu } from '@/hooks/post/useFavoriteMenu';
import { useResetRegistInfo } from '@/hooks/post/useResetRegistInfo';
import { useGetTodayCoffeeData } from '@/hooks/home/useGetTodayCoffeeData';
import { coffeeInfoFormatter } from '@/utils/coffeeInfoFormatter';

import { caffeineIntakeState } from '@/atoms/atoms';
import { CAFFEINE_TEXTS } from '@/constants/common';
import { POST_REGISTER_TEXTS } from '@/constants/texts';
import { useEffect } from 'react';

const { recommendedCaffeine } = CAFFEINE_TEXTS;
const { description, coffeeOptionText } = POST_REGISTER_TEXTS.success;
export const useRagistrationSuccessView = () => {
  const caffeineIntake = useRecoilValue(caffeineIntakeState);
  const { caffeine, coffeeInfo } = coffeeInfoFormatter(caffeineIntake);
  const { isModal, setIsModal } = useVerifyModalCTA();
  const { todayCaffeine } = useGetTodayCoffeeData();

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
    if (todayCaffeine <= recommendedCaffeine) {
      const sum = recommendedCaffeine - todayCaffeine;
      const { prefix, suffix } = description.recommend;
      return { sum, prefix, suffix };
    }
    const sum = todayCaffeine - recommendedCaffeine;
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

  useEffect(() => {
    caffeine === 0 && navigate('/');
  }, []);
  0;

  return {
    isModal,
    isfailed,
    moveFavoriteTab,
    caffeine,
    descriptionText,
    coffeeIntakeEntries,
    handleModal,
    caffeineIntakePost,
    navToWhere,
    handleOnClick,
    coffeeintakeValues
  };
};
