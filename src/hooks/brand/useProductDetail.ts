import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useFavoriteMenu } from '@/hooks/post/useFavoriteMenu';
import { useCoffeeSelection } from '@/hooks/useCoffeeSelection';
import { useGetTodayCoffeeData } from '@/hooks/home/useGetTodayCoffeeData';
import { registerCaffeineIntake } from '@/api/post';
import { getProductComparison } from '@/api/brand';
import { caffeineFilterState, caffeineIntakeState } from '@/atoms/atoms';
import { ProductComparisonTypes } from '@/types/types';

export const useProductDetail = () => {
  const { brandName, productName } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isFavMenu, setIsFavMenu] = useState(false);
  const [isfavId, setIsFavId] = useState('');
  const [caffeine, setCaffeine] = useRecoilState(caffeineFilterState);
  const [caffeineIntake, setCaffeineIntake] =
    useRecoilState(caffeineIntakeState);

  const { getMenuInfo } = useCoffeeSelection();
  const { isModal, setIsModal } = useVerifyModalCTA();
  const { res, deleteFavMenu } = useFavoriteMenu();

  // set caffeine info
  useEffect(() => {
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
  const { updateTodayCoffeeData: getTodayCoffeeData } = useGetTodayCoffeeData();

  const { mutate } = useMutation({
    mutationKey: ['caffeineRegister'],
    mutationFn: async () => {
      const res = await registerCaffeineIntake(caffeineIntake);
      return res;
    },
    onSuccess: () => {
      getTodayCoffeeData();
      navigate('/post/caffeineIntake/caffeine');
    }
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
        state && (await getProductComparison(state.brand, state.menu));
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
function handleCaffeineRegister() {
  throw new Error('Function not implemented.');
}
