import MyCalendar from '@/components/coffee/MyCalendar';
import CaffeineHistory from '@/components/coffee/CaffeineHistory';

import { useGetCalendarData } from '@/hooks/coffee/useGetCalendarData';

const HistoryTab = ({
  signedIn,
  activeStartDate
}: {
  signedIn: string;
  activeStartDate: Date;
}) => {
  const { data, activeMonth } = useGetCalendarData(signedIn);

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
