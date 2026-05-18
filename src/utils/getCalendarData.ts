import { CalendarData } from '@/types/types';

export const getCalendarData = (data: CalendarData[]) => {
  const coffeeData = data;

  const healthy = coffeeData?.filter(
    item => item && Number(item.caffeineSum) <= 200
  );

  const recommended = coffeeData?.filter(
    item =>
      item && Number(item.caffeineSum) <= 400 && Number(item.caffeineSum) > 200
  );

  const excessive = coffeeData?.filter(
    item => item && Number(item.caffeineSum) > 401
  );

  return { healthy, recommended, excessive };
};
