import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { brandMapToKor } from '@/utils/convertBrandName';

import { getPopularRanking } from '@/api/brand';
import {
  CoffeeDataTypes,
  CoffeeItemTypes,
  productRankingItemTypes
} from '@/types/types';

export const useBrandDetail = () => {
  const navigate = useNavigate();
  const { brandName } = useParams();

  // 메뉴 리스트 조회
  const coffeeData = useGetCoffeeList() as CoffeeDataTypes;

  const getMenuList = () => {
    const res = brandName && coffeeData?.[brandName]?.map(item => item);
    return res;
  };

  const brand = brandName && brandMapToKor(brandName);
  const menuList = coffeeData && getMenuList();

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

  return { brand, rankingData, menuList, navToDetail };
};
