import { useEffect, useState } from 'react';
import { getCoffeeCaledar } from '@/api/coffee';
import { CalendarData } from '@/types/types';

export const useGetCalendarData = (signedIn: string, activeMonth: string) => {
  const [coffeeData, setCoffeeData] = useState<(CalendarData | null)[]>();
  const getCalendarData = async (date: string) => {
    const res = await getCoffeeCaledar(date);
    res && setCoffeeData(res.days);
  };

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

  useEffect(() => {
    signedIn && getCalendarData(activeMonth);
  }, [activeMonth, signedIn]);

  return { healthy, recommended, excessive };
};
