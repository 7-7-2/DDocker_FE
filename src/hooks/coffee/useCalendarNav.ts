import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { activeMonthState } from '@/atoms/atoms';

export const useCalendarNav = (
  isActionModal: boolean | undefined,
  handleActionModal: () => void
) => {
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
    }
  };

  // 이후 버튼 클릭
  const handleNextBtn = () => {
    const nextMonth = dayjs(activeStartDate).add(1, 'month').toDate();
    const nextYear = dayjs(activeStartDate).add(1, 'year').toDate();
    setActiveStartDate(isActionModal ? nextYear : nextMonth);
    handleChange(isActionModal ? nextYear : nextMonth);
  };
  const nextBtnState =
    activeMonth.split('-')[0] <= value.split('-')[0] &&
    activeMonth.split('-')[1] < value.split('-')[1];
  const prevBtnState = activeMonth.split('-')[0] <= '2025';

  // 이전 버튼 클릭
  const handlePrevBtn = () => {
    const prevMonth = dayjs(activeStartDate).subtract(1, 'month').toDate();
    const prevYear = dayjs(activeStartDate).subtract(1, 'year').toDate();
    setActiveStartDate(isActionModal ? prevYear : prevMonth);
    handleChange(isActionModal ? prevYear : prevMonth);
  };

  const selectMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selected = Number(e.currentTarget?.value);
    const selectedMonth = dayjs(activeStartDate)
      .month(selected - 1)
      .toDate();
    setActiveStartDate(selectedMonth);
    handleChange(selectedMonth);
    handleActionModal();
  };

  return {
    value,
    setActiveStartDate,
    activeMonth,
    activeStartDate,
    nextBtnState,
    prevBtnState,
    handleNextBtn,
    handlePrevBtn,
    selectMonth
  };
};
