import { CoffeeDataTypes } from '@/types/types';

export const setBrnadList = (coffeeData: CoffeeDataTypes) => {
  const list = Object.keys(coffeeData);
  return list;
};
