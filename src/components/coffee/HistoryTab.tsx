import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import MyCalendar from '@/components/coffee/MyCalendar';
import CaffeineHistory from '@/components/coffee/CaffeineHistory';

import { getCoffeeCaledar } from '@/api/coffee';
import { activeMonthState } from '@/atoms/atoms';

const HistoryTab = ({
  signedIn,
  activeStartDate
}: {
  signedIn: string;
  activeStartDate: Date;
}) => {
  const activeMonth = useRecoilValue(activeMonthState);
  const { data } = useQuery({
    queryKey: ['coffeeCalendar', activeMonth],
    queryFn: async () => {
      const data = await getCoffeeCaledar(activeMonth);
      return data;
    },
    enabled: !!signedIn
  });

  return (
    <>
      <MyCalendar
        signedIn={signedIn}
        activeStartDate={activeStartDate}
        data={data?.summary}
      />
      <CaffeineHistory
        data={data}
        activeMonth={activeMonth}
      />
    </>
  );
};

export default HistoryTab;
