import coffeeData from '@/datas/coffees';

export const setBrnadList = () => {
  const list = Object.keys(coffeeData);
  return list;
};
