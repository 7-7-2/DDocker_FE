import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import MyCalendar from '@/components/coffee/MyCalendar';
import CaffieneHistory from '@/components/coffee/CaffieneHistory';

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
      <CaffieneHistory data={data} />
    </>
  );
};

export default HistoryTab;
