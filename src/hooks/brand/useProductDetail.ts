import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';

import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useFavoriteMenu } from '@/hooks/post/useFavoriteMenu';
import { usePostMutation } from '@/hooks/post/usePostMutation';
import { useCoffeeSelection } from '@/hooks/useCoffeeSelection';
import { caffeineFilterState, caffeineIntakeState } from '@/atoms/atoms';

export const useProductDetail = () => {
  const { state } = useLocation();
  const { brandName, productName } = useParams();
  const [isFavMenu, setIsFavMenu] = useState(false);
  const [isfavId, setIsFavId] = useState('');
  const [caffeineIntake, setCaffeineIntake] =
    useRecoilState(caffeineIntakeState);
  const [caffeine, setCaffeine] = useRecoilState(caffeineFilterState);

  const { getMenuInfo } = useCoffeeSelection();
  const { isModal, setIsModal } = useVerifyModalCTA();
  const { res, deleteFavMenu } = useFavoriteMenu();

  // set caffeine info
  useLayoutEffect(() => {
    if (state) {
      setCaffeine({ caffeine: state.caffeine, menuCaffeine: state.caffeine });
    } else if (!state && productName && brandName) {
      getMenuInfo(productName, brandName);
    }
    setCaffeineIntake({
      ...caffeineIntake,
      caffeine: state.caffeine,
      brand: state.brand,
      productName: state.menu,
      size: 'Tall',
      intensity: '기본',
      shot: 0
    });
  }, []);

  // register
  const { mutate } = useMutation({
    mutationKey: ['postRegister', false, true]
  });

  const handleRegisterBtn = () => {
    mutate();
  };

  // favorieMenu
  const handleModal = () => {
    setIsFavMenu(!isFavMenu);
    setIsModal(!isModal);
  };

  const handleFavBtn = () => {
    if (isFavMenu) {
      deleteFavMenu(Number(isfavId));
      setIsFavMenu(!isFavMenu);
      return;
    } else {
      setCaffeineIntake({
        ...caffeineIntake,
        caffeine: caffeine.caffeine
      });
      setIsFavMenu(!isFavMenu);
      setIsModal(!isModal);
      return;
    }
  };

  useEffect(() => {
    res?.some(item => {
      const favMenuInfo = [
        item.brand,
        item.productName,
        item.size,
        item.intensity,
        item.shot
      ];
      const { caffeine, ...rest } = caffeineIntake;
      if (JSON.stringify(favMenuInfo) === JSON.stringify(Object.values(rest))) {
        setIsFavId(item.id);
        setIsFavMenu(true);
        return true;
      }
      setIsFavId('');
      setIsFavMenu(false);
      return false;
    });
  }, [caffeine, isModal]);

  return {
    state,
    isModal,
    isFavMenu,
    handleModal,
    handleFavBtn,
    caffeineIntake,
    handleRegisterBtn
  };
};
