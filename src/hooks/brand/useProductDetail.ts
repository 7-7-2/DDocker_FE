import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useFavoriteMenu } from '@/hooks/post/useFavoriteMenu';
import { useCoffeeSelection } from '@/hooks/useCoffeeSelection';
import { caffeineFilterState, caffeineIntakeState } from '@/atoms/atoms';
import { getProductComparison } from '@/api/brand';
import { ProductComparisonTypes } from '@/types/types';

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
      brand: state.brand || brandName,
      productName: state.menu || productName,
      size: 'Tall',
      intensity: '기본',
      shot: 0
    });
  }, []);

  // 카페인 등록하기
  const { mutate } = useMutation({
    mutationKey: ['postRegister', false, true]
  });

  const handleRegisterBtn = () => {
    mutate();
  };

  // 즐겨찾는 메뉴 등록
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

  // 브랜드 인기 메뉴 조회
  const { data: comparisonData } = useQuery({
    queryKey: ['getProductComparison'],
    queryFn: async () => {
      const res =
        brandName &&
        productName &&
        (await getProductComparison(brandName, productName));
      return res ? (res as ProductComparisonTypes) : null;
    }
  });

  return {
    state,
    isModal,
    isFavMenu,
    handleModal,
    handleFavBtn,
    caffeineIntake,
    handleRegisterBtn,
    comparisonData
  };
};
