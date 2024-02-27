import { CoffeeData } from '@/types/types';

export const setBrnadList = (coffeeData: CoffeeData) => {
  const list = Object.keys(coffeeData);
  return list;
};
