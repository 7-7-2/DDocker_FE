import { CaffeineIntakeTypes } from '@/types/types';
import { brandMapToKor } from '@/utils/convertBrandName';
import { customOptionFormmater } from '@/utils/customOptionFormmater';

export const coffeeInfoFormatter = (caffeineIntake: CaffeineIntakeTypes) => {
  const { caffeine, ...rest } = caffeineIntake;
  const coffeeInfoValues = Object.values(rest);
  const customOption = [rest.size, rest.intensity, rest.shot];

  const coffeeInfo = [
    brandMapToKor(coffeeInfoValues[0] as string),
    coffeeInfoValues[1],
    customOptionFormmater(customOption)
  ];
  return { caffeine, coffeeInfo };
};
