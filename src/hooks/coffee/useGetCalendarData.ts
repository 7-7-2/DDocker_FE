import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { activeMonthState } from '@/atoms/atoms';
import { getCoffeeCaledar } from '@/api/coffee';

export const useGetCalendarData = (signedIn: string) => {
  const activeMonth = useRecoilValue(activeMonthState);
  const { data } = useQuery({
    queryKey: ['coffeeCalendar', activeMonth],
    queryFn: async () => {
      const data = await getCoffeeCaledar(activeMonth);
      return data;
    },
    enabled: !!signedIn
  });
  return { data, activeMonth };
};
