import { useQuery } from '@tanstack/react-query';

import { getCoffeeCaledar } from '@/api/coffee';
import { CalendarData } from '@/types/types';

export const useGetCalendarData = (signedIn: string, activeMonth: string) => {
  const { data } = useQuery({
    queryKey: ['coffeeCalendar', activeMonth],
    queryFn: async () => {
      const data = await getCoffeeCaledar(activeMonth);
      return data.days;
    },
    enabled: !!signedIn
  });

  const coffeeData = data as CalendarData[];

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
