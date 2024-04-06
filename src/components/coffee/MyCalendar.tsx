import dayjs from 'dayjs';
import { useState } from 'react';
import ReactCalendar, { OnArgs, TileArgs } from 'react-calendar';

import { COFFEE_CALENDAR_TEXTS } from '@/constants/coffee';
import { validateDay } from '@/utils/validateDay';
import { useGetCalendarData } from 'hooks/coffee/useGetCalendarData';
import { CalendarData } from '@/types/types';

import { Blur, InputByteCheck, SumTitle } from '@/styles/styles';
import { Align, Flex } from '@/styles/layout';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const { title, legend } = COFFEE_CALENDAR_TEXTS;

const MyCalendar = ({ signedIn }: { signedIn: string }) => {
  const [value] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [activeMonth, setActiveMonth] = useState<string>(
    dayjs(new Date()).format('YYYY-MM-DD')
  );

  const { healthy, recommended, excessive } = useGetCalendarData(
    signedIn,
    activeMonth
  );

  const handleChange = (activeStartDate: Date | null) => {
    if (activeStartDate) {
      setActiveMonth(dayjs(new Date(activeStartDate)).format('YYYY-MM-DD'));
    }
  };

  return (
    <Container>
      <Title className={SumTitle}>{title}</Title>
      <ReactCalendar
        className={cx(MyCoffeeCalendar, !signedIn ? Blur : undefined)}
        value={value}
        onActiveStartDateChange={({ activeStartDate }: OnArgs) =>
          handleChange(activeStartDate)
        }
        next2Label={null}
        prev2Label={null}
        calendarType="gregory"
        formatDay={(__locale, date) => dayjs(date).format('D')}
        formatMonthYear={(__locale, date) => dayjs(date).format('YYYY. MM')}
        tileContent={({ date }: TileArgs) => {
          if (
            healthy?.find(
              (item: CalendarData | null) => item && validateDay(item.day, date)
            )
          ) {
            return <Marker className={Healthy} />;
          }
          if (
            recommended?.find(
              (item: CalendarData | null) => item && validateDay(item.day, date)
            )
          ) {
            return <Marker className={Recommended} />;
          }
          if (
            excessive?.find(
              (item: CalendarData | null) => item && validateDay(item.day, date)
            )
          ) {
            return <Marker className={Excessive} />;
          }
          return null;
        }}
      />
      <MarkerLegend
        className={cx(InputByteCheck, Flex, !signedIn ? Blur : undefined)}>
        {legend.map(item => (
          <MarkerKey
            className={Align}
            key={item.number}>
            <Marker
              className={
                item.className === legend[0].className
                  ? Healthy
                  : item.className === legend[1].className
                    ? Recommended
                    : Excessive
              }
            />
            {item.number}
          </MarkerKey>
        ))}
      </MarkerLegend>
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  margin: 60px 0 48px;
`;
const Title = styled.h2`
  margin-bottom: 24px;
`;

const MyCoffeeCalendar = css`
  width: 100%;
  height: 100%;
  margin-bottom: 6px;
  & .react-calendar__navigation {
    display: flex;
    font-size: var(--font-sizes-xl);
    font-weight: 600;
    padding: 0 24px;
    margin-bottom: 8px;
    align-items: center;
    & button {
      background: none;
      border: 1px soild var(--colors-main-dark);
    }
  }

  & .react-calendar__month-view__weekdays {
    height: 44px;
    display: flex;
    text-align: center;
    align-items: center;
    font-size: var(--font-sizes-base);
    color: var(--colors-mid-grey);

    & abbr {
      text-decoration: none;
    }
  }

  & .react-calendar__month-view__days__day {
    color: var(--colors-main-dark);
  }

  & .react-calendar__month-view__days__day--neighboringMonth {
    color: var(--colors-btn-grey);
  }

  & .react-calendar__tile {
    height: 48px;
    vertical-align: center;
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & abbr {
      box-sizing: content-box;
      margin-bottom: 4px;
      padding-top: 3px;
      height: 27px;
    }
  }

  & .react-calendar__tile--active {
    & abbr {
      font-weight: 600;
      width: 30px;
      border-radius: 50%;
      color: #fff;
      background-color: var(--colors-main);
    }
  }
`;

const MarkerLegend = styled.div`
  padding-right: 14px;
  justify-content: flex-end;
  gap: 12px;
`;

const MarkerKey = styled.span`
  gap: 4px;
`;

const Marker = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

const Healthy = css`
  background-color: #d6d6d6;
`;
const Recommended = css`
  background-color: #4fcaa5;
`;
const Excessive = css`
  background-color: var(--colors-main);
`;

export default MyCalendar;
