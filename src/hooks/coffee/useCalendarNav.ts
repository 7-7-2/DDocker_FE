import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeMonthState, statsNavigationState } from '@/atoms/atoms';
import { COFFEE_TEXTS } from '@/constants/coffee';

export const useCalendarNav = (
  isActionModal: boolean | undefined,
  selectedTab: string,
  handleActionModal: () => void
) => {
  const [value] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const today = dayjs().toDate();

  const [activeStartDate, setActiveStartDate] = useState(today);
  const [activeMonth, setActiveMonth] = useRecoilState(activeMonthState);

  const weeklyDate = useRecoilValue(statsNavigationState);
  const weeklyAnalysis = selectedTab === COFFEE_TEXTS.tabs[1] && !!weeklyDate;

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
    if (weeklyAnalysis && weeklyDate) {
      const nextWeek = dayjs(activeStartDate).add(1, 'week').toDate();
      setActiveStartDate(nextWeek);
      handleChange(nextWeek);
    } else {
      const nextMonth = dayjs(activeStartDate).add(1, 'month').toDate();
      const nextYear = dayjs(activeStartDate).add(1, 'year').toDate();
      setActiveStartDate(isActionModal ? nextYear : nextMonth);
      handleChange(isActionModal ? nextYear : nextMonth);
    }
  };

  const nextBtnState = activeMonth !== value;

  // 이전 버튼 클릭
  const handlePrevBtn = () => {
    if (weeklyAnalysis && weeklyDate) {
      const prevWeek = dayjs(activeStartDate).subtract(1, 'week').toDate();
      setActiveStartDate(prevWeek);
      handleChange(prevWeek);
    } else {
      const prevMonth = dayjs(activeStartDate).subtract(1, 'month').toDate();
      const prevYear = dayjs(activeStartDate).subtract(1, 'year').toDate();
      setActiveStartDate(isActionModal ? prevYear : prevMonth);
      handleChange(isActionModal ? prevYear : prevMonth);
    }
  };

  const prevBtnState =
    Number(activeMonth.split('-')[0]) <= 2025 || (isActionModal ? true : false);

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
    selectMonth,
    weeklyAnalysis
  };
};
