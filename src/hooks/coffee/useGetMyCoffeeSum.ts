import { getCoffeeIntake } from '@/api/coffee';
import { activeMonthState } from '@/atoms/atoms';
import { COFFEE_TEXTS } from '@/constants/coffee';
import {
  InvalidateQueryFilters,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const { week } = COFFEE_TEXTS;
export const useGetMyCoffeeSum = (signedIn: string | null) => {
  const queryClient = useQueryClient();
  const activeMonth = useRecoilValue(activeMonthState);

  const periodsDate = activeMonth.split('-', 2);
  const year = Number(periodsDate[0]);
  const month = Number(periodsDate[1]);

  const periods = [
    { label: week, key: 'WEEK' },
    { label: month, key: 'MONTH' },
    { label: year, key: 'YEAR' }
  ];

  const { data: coffeeIntake } = useQuery({
    queryKey: ['coffeeIntake', activeMonth],
    queryFn: async () => {
      const data = await getCoffeeIntake(activeMonth);
      return data;
    },
    enabled: !!signedIn
  });

  const filter = ['coffeeIntake', activeMonth] as InvalidateQueryFilters;

  useEffect(() => {
    if (activeMonth) {
      queryClient.invalidateQueries(filter);
    }
  }, [activeMonth, queryClient]);

  return { periods, coffeeIntake };
};
