import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import ReactCalendar, { TileArgs } from 'react-calendar';

import Icon from '@/components/common/Icon';
import LegendMarker from '@/components/coffee/LegendMarker';

import { getCalendarData } from '@/utils/getCalendarData';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { validateDay } from '@/utils/validateDay';

import { activeMonthState } from '@/atoms/atoms';
import { CalendarData } from '@/types/types';
import { COFFEE_CALENDAR_TEXTS } from '@/constants/coffee';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  InputByteCheck,
  Excessive,
  Healthy,
  Recommended
} from '@/styles/styles';
import { Align, Between, Flex, FlexCenter, Justify } from '@/styles/layout';

const { legend, weekView } = COFFEE_CALENDAR_TEXTS;
const MyCalendar = ({
  signedIn,
  activeStartDate,
  data
}: {
  signedIn: string;
  activeStartDate: Date;
  data: CalendarData[];
}) => {
  const [value] = useState(dayjs(new Date()).format('M'));
  const [isClosed, setIsClosed] = useState(signedIn ? true : false);

  // Data 조회
  const activeMonth = useRecoilValue(activeMonthState);
  const checkMonth = Number(activeMonth?.split('-')[1]);
  const { healthy, recommended, excessive } = getCalendarData(data);

  // Drawer close
  useLayoutEffect(() => {
    const calendar = document.querySelector('.react-calendar');
    const topInParent = (
      document.querySelector('.react-calendar__tile--active') as HTMLElement
    )?.offsetTop;
    const focusPosition = topInParent - 58;
    calendar?.scrollTo(0, focusPosition);
  }, [isClosed, checkMonth]);

  const handleOnclick = () => {
    setIsClosed(!isClosed);
  };

  return (
    <Container>
      <WeekViewText className={cx(Flex, Between)}>
        {weekView.map(item => (
          <Item
            key={item}
            className={cx(Justify, Align)}>
            {item}
          </Item>
        ))}
      </WeekViewText>
      <Drawer>
        <ReactCalendar
          className={cx(
            MyCoffeeCalendar,
            isClosed && DrawerClose,
            checkMonth === Number(value) ? ActiveTile : DefaulitActiveTile
          )}
          activeStartDate={activeStartDate}
          value={activeStartDate}
          showNavigation={false}
          maxDate={new Date()}
          minDate={new Date(2026, 0, 1)}
          calendarType="gregory"
          formatDay={(__locale, date) => dayjs(date).format('D')}
          formatShortWeekday={() => ''}
          tileContent={({ date }: TileArgs) => {
            if (
              healthy?.find(
                (item: CalendarData | null) =>
                  item && validateDay(checkMonth, item.day, date)
              )
            ) {
              return <Marker className={Healthy} />;
            }
            if (
              recommended?.find(
                (item: CalendarData | null) =>
                  item && validateDay(checkMonth, item.day, date)
              )
            ) {
              return <Marker className={Recommended} />;
            }
            if (
              excessive?.find(
                (item: CalendarData | null) =>
                  item && validateDay(checkMonth, item.day, date)
              )
            ) {
              return <Marker className={Excessive} />;
            }
            return null;
          }}
        />
        {!isClosed && (
          <MarkerLegend className={cx(InputByteCheck, Flex)}>
            {legend.map(item => (
              <MarkerKey
                className={Align}
                key={item.number}>
                <LegendMarker legend={item.className} />
                {item.number}
              </MarkerKey>
            ))}
          </MarkerLegend>
        )}
        <DrawerBtn
          className={FlexCenter}
          onClick={handleOnclick}>
          {isClosed ? (
            <Icon {...iconPropsGenerator('drawer-open', '21')} />
          ) : (
            <Icon {...iconPropsGenerator('drawer-close', '21')} />
          )}
        </DrawerBtn>
      </Drawer>
    </Container>
  );
};

const MyCoffeeCalendar = css`
  margin-bottom: 6px;

  & .react-calendar__month-view__days__day {
    line-height: 22px;
    color: var(--colors-main-dark);
  }

  & .react-calendar__month-view__days__day--neighboringMonth {
    color: var(--colors-btn-grey);
  }

  & .react-calendar__tile {
    height: 50px;
    padding-bottom: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & abbr {
      box-sizing: content-box;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 4px;
      height: 28px;
    }
  }

  & .react-calendar__tile--active {
    & abbr {
      font-weight: 600;
      width: 28px;
      text-align: center;
      border-radius: 50%;
    }
  }
`;

const Container = styled.div`
  position: relative;
  margin: 0 -20px;
`;

const WeekViewText = styled.div`
  position: relative;
  color: #959595;
  height: 48px;
  padding: 0 20px;
  font-size: var(--font-sizes-base);
  background-color: #fff;
  z-index: 3;
`;

const Item = styled.div`
  width: 48px;
`;

const Drawer = styled.div`
  padding: 0 20px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.14);
`;

const DrawerBtn = styled.div`
  margin-top: 24px;
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

export const ActiveTile = css`
  & .react-calendar__tile--active {
    & abbr {
      background-color: #ffeee4;
      color: var(--colors-main);
    }
  }
`;
export const DefaulitActiveTile = css`
  & .react-calendar__tile--active {
    & abbr {
      background-color: var(--colors-border-grey);
      color: var(--colors-main-dark);
      font-weight: 400;
    }
  }
`;

const DrawerClose = css`
  height: 50px;
  overflow: hidden;
  border: none;
`;

export default MyCalendar;
