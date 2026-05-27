import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';

import useGetUserInfo from '@/hooks/useGetUserInfo';
import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { caffeineFilterState, caffeineIntakeState } from '@/atoms/atoms';
import { CoffeeDataTypes } from '@/types/types';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';

const { coffeeOption } = CAFFEINE_FILTER_TEXTS;

export const useCoffeeSelection = () => {
  useGetUserInfo();
  const { postId, type, brandName } = useParams();
  const register = postId === 'register' || type === 'update';
  const brand = !!brandName;
  const [caffeineIntake, setCaffeineIntake] =
    useRecoilState(caffeineIntakeState);
  const [caffeine, setCaffeine] = useRecoilState(caffeineFilterState);

  const caffeineValue = caffeine.caffeine;
  const menuCaffeineValue = caffeine.menuCaffeine;

  const setRegisterData = (key: string, value: string | number) => {
    if (key === 'brand') {
      const newRegistData = {
        ...caffeineIntake,
        [key]: value as string,
        productName: ''
      };
      setCaffeineIntake(newRegistData);
      return;
    }

    if (key === 'productName') {
      const newRegistData = {
        ...caffeineIntake,
        [key]: value as string,
        shot: 0,
        size: coffeeOption.sizeOption[0],
        intensity: '기본'
      };
      setCaffeineIntake(newRegistData);
      return;
    }
    if (key === 'intensity' && value === coffeeOption.intensityOption[0]) {
      const newRegistData = {
        ...caffeineIntake,
        shot: 0,
        [key]: value
      };
      setCaffeineIntake(newRegistData);
      return;
    } else {
      const newRegistData = {
        ...caffeineIntake,
        [key]: value
      };
      return setCaffeineIntake(newRegistData);
    }
  };
  const setCaffeineInfo = async (caffeine: number) => {
    setCaffeine({
      caffeine: caffeine,
      menuCaffeine: caffeine
    });
  };

  // 브랜드 리스트
  const coffeeData = useGetCoffeeList() as CoffeeDataTypes;
  const brandList = useGetCoffeeList('brand') as string[];

  // 선택한 커피 브랜드 메뉴 리스트 조회
  const getMenuList = (selectedBrand: string) => {
    const res = coffeeData?.[selectedBrand]?.map(item => item.menu);
    return res;
  };

  // 메뉴 리스트
  const menuList = coffeeData && getMenuList(caffeineIntake.brand);

  // 선택한 커피 메뉴 정보 조회 / 기준값 설정
  const getMenuInfo = async (selectedMenu: string) => {
    const res = coffeeData?.[caffeineIntake.brand]?.filter(
      item => item.menu === selectedMenu
    );
    // caffeine Info Update
    const caffeine = res && res[0].caffeine;
    caffeine && (await setCaffeineInfo(Number(caffeine)));
    return caffeine;
  };

  // 커피사이즈
  const calculateSizeOption = (selectedSize: string) => {
    const size =
      caffeineIntake.productName && selectedSize === coffeeOption.sizeOption[1]
        ? 75
        : caffeineIntake.productName &&
            selectedSize === coffeeOption.sizeOption[2]
          ? 150
          : 0;
    return size;
  };

  //**CaffeineIntake Select Process**
  // 1.커피 브랜드 선택
  const selectBrand = (e: React.MouseEvent<HTMLButtonElement>) => {
    getMenuList(e.currentTarget.value);
    setRegisterData('brand', e.currentTarget.value);
    // setCaffeineInfo(0);
  };

  //2.커피 메뉴 선택
  const selectMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    getMenuInfo(e.currentTarget.value);
    setRegisterData('productName', e.currentTarget.value);
  };

  // 3. 커피 옵션 선택 - 사이즈
  const selectSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRegisterData('size', e.currentTarget.value);
    const size = calculateSizeOption(e.currentTarget.value);
    setCaffeine({
      caffeine:
        menuCaffeineValue + size + caffeineIntake.shot * 75 - (mild ? 75 : 0),
      menuCaffeine: menuCaffeineValue
    });
  };

  // 4. 커피 옵션 선택 - 농도
  const mild = caffeineIntake.intensity === coffeeOption.intensityOption[0];

  const selectIntensityOption = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setRegisterData('intensity', e.currentTarget.value);
    const size = calculateSizeOption(caffeineIntake.size);
    setCaffeine({
      caffeine:
        caffeineIntake.productName &&
        e.currentTarget.value === coffeeOption.intensityOption[0]
          ? menuCaffeineValue + size - 75
          : menuCaffeineValue + size,
      menuCaffeine: menuCaffeineValue
    });
  };

  // 5. 커피 옵션 선택 - 샷 추가
  const selectMinusBtn = async () => {
    const isValid = caffeineIntake.productName && caffeineIntake.shot >= 1;
    isValid && setRegisterData('shot', caffeineIntake.shot - 1);
    isValid &&
      setCaffeine({
        caffeine: caffeineValue - 75,
        menuCaffeine: menuCaffeineValue
      });
  };

  const selectPlusBtn = async () => {
    const isValid =
      caffeineIntake.productName && !mild && caffeineIntake.shot < 6;
    isValid && setRegisterData('shot', caffeineIntake.shot + 1);
    isValid &&
      setCaffeine({
        caffeine: caffeineValue + 75,
        menuCaffeine: menuCaffeineValue
      });
  };

  const shotPlusBtnActive =
    !caffeineIntake.productName || mild || caffeineIntake.shot >= 6;

  // **즐겨찾는 메뉴 사용하기**
  const { mutate } = useMutation({
    mutationFn: async () => {
      const menuCaffeineValue = await getMenuInfo(caffeineIntake.productName);
      const size = calculateSizeOption(caffeineIntake.size);
      setCaffeine({
        caffeine:
          menuCaffeineValue + size + caffeineIntake.shot * 75 - (mild ? 75 : 0),
        menuCaffeine: menuCaffeineValue
      });
    }
  });

  return {
    brand,
    register,
    caffeineValue,
    caffeineIntake,
    brandList,
    menuList,
    selectBrand,
    selectMenu,
    selectSize,
    selectIntensityOption,
    selectMinusBtn,
    selectPlusBtn,
    shotPlusBtnActive,
    mutate
  };
};
