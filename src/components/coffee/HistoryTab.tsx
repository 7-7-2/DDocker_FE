import MyCalendar from '@/components/coffee/MyCalendar';
import CaffeineHistory from '@/components/coffee/CaffeineHistory';

import { useGetCalendarData } from '@/hooks/coffee/useGetCalendarData';
import { Column } from '@/styles/layout';
import { styled } from 'styled-system/jsx';

const HistoryTab = ({
  signedIn,
  activeStartDate
}: {
  signedIn: string;
  activeStartDate: Date;
}) => {
  const { data, activeMonth } = useGetCalendarData(signedIn);

  return (
    <Container className={Column}>
      <MyCalendar
        signedIn={signedIn}
        activeStartDate={activeStartDate}
        data={data?.summary}
      />
      <CaffeineHistory
        data={data}
        activeMonth={activeMonth}
      />
    </Container>
  );
};
const Container = styled.div`
  height: 100%;
`;
export default HistoryTab;
