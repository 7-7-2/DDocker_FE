import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { useSearchInput } from '@/hooks/search/useSearchInput';
import { brandMapToKor } from '@/utils/convertBrandName';

import { getPopularRanking } from '@/api/brand';
import {
  CoffeeDataTypes,
  CoffeeItemTypes,
  productRankingItemTypes
} from '@/types/types';

export const useBrandDetail = (isLowest: boolean) => {
  const navigate = useNavigate();
  const { brandName } = useParams();
  const { search, reset, handleChange } = useSearchInput();

  // 메뉴 리스트 조회
  const coffeeData = useGetCoffeeList() as CoffeeDataTypes;

  // 카페인 함량별 정렬
  const getMenuList = (isLowest: boolean) => {
    const res: CoffeeItemTypes[] =
      brandName && coffeeData?.[brandName]
        ? coffeeData[brandName].map(item => item)
        : [];
    if (isLowest) {
      const menuList = [...res].sort((a, b) => a.caffeine - b.caffeine);
      return menuList;
    } else {
      const menuList = [...res].sort((a, b) => b.caffeine - a.caffeine);
      return menuList;
    }
  };

  const brand = brandName && brandMapToKor(brandName);
  const menuList = coffeeData && getMenuList(isLowest);
  const searchMenuList =
    menuList && menuList.filter(item => item.menu.includes(search));
  const productData = searchMenuList ? searchMenuList : menuList;

  // 브랜드 인기 메뉴 조회
  const { refetch: getRanking, data: rankingData } = useQuery({
    queryKey: ['getPopularRanking'],
    queryFn: async () => {
      const res = brandName && (await getPopularRanking(brandName));
      return res as productRankingItemTypes[];
    }
  });

  // 매뉴 상세페이지로 이동
  const navToDetail = (data: CoffeeItemTypes) => {
    navigate(`/brand/${brandName}/${encodeURIComponent(data.menu)}`, {
      state: data
    });
  };

  return {
    brand,
    rankingData,
    productData,
    navToDetail,
    search,
    reset,
    handleChange
  };
};
