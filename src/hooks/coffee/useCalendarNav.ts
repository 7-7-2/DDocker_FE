import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { activeMonthState } from '@/atoms/atoms';

export const useCalendarNav = () => {
  const [value] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const today = dayjs().toDate();
  const [activeStartDate, setActiveStartDate] = useState(today);
  const [activeMonth, setActiveMonth] = useRecoilState(activeMonthState);

  const handleChange = (activeStartDate: Date | null) => {
    if (activeStartDate) {
      const nowActiveMonth = dayjs(new Date(activeStartDate)).format(
        'YYYY-MM-DD'
      );
      setActiveMonth(nowActiveMonth);
      // setCheckMonth(Number(nowActiveMonth.split('-')[1]));
    }
  };

  // 이후 버튼 클릭
  const handleNextBtn = () => {
    const nextMonth = dayjs(activeStartDate).add(1, 'month').toDate();
    setActiveStartDate(nextMonth);
    handleChange(nextMonth);
  };
  const nextBtnState =
    activeMonth.split('-')[0] <= value.split('-')[0] &&
    activeMonth.split('-')[1] < value.split('-')[1];

  // 이전 버튼 클릭
  const handlePrevBtn = () => {
    const prevMonth = dayjs(activeStartDate).subtract(1, 'month').toDate();
    setActiveStartDate(prevMonth);
    handleChange(prevMonth);
  };

  return {
    value,
    setActiveStartDate,
    activeMonth,
    activeStartDate,
    nextBtnState,
    handleNextBtn,
    handlePrevBtn
  };
};
