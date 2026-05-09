import { activeMonthState } from '@/atoms/atoms';
import { COFFEE_HISTOEY_TEXTS } from '@/constants/coffee';
import { Align, Between, Column, DVW, Flex, FlexGrow } from '@/styles/layout';
import {
  Bold,
  BtnColorBorder,
  BtnColorBorderWhite,
  BtnColorMain,
  Gap12,
  Medium,
  Semibold
} from '@/styles/styles';
import {
  CaffeineHistoryTypes,
  CaffeineIntakeTypes,
  CalendarData,
  DailyRecordsTypes
} from '@/types/types';
import { coffeeInfoFormatter } from '@/utils/coffeeInfoFormatter';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
const { filter, count, pre, suf } = COFFEE_HISTOEY_TEXTS;
const CaffieneHistory = ({ data }: { data: CaffeineHistoryTypes }) => {
  const [isSelected, setIsSelected] = useState(filter[0]);
  const activeMonth = Number(useRecoilValue(activeMonthState)?.split('-')[1]);

  const handleDate = (day: number) => {
    const formattedMonth = String(activeMonth).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    return `${formattedMonth}.${formattedDay}`;
  };

  const caffeineSumState = (caffeineSum: string) => {
    const caffeine = Number(caffeineSum);
    if (caffeine <= 400) return { color: 'var(--colors-recommended)' };
    if (caffeine > 400) return { color: 'var(--colors-delete-red)' };
    return { color: 'var(--colors-main-dark)' };
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelected(e.currentTarget.value);
  };

  const handleFilteringData = (data: CalendarData[]) => {
    if (isSelected === filter[1]) {
      const commended = data.filter(date => Number(date.caffeineSum) <= 400);
      return commended;
    }
    if (isSelected === filter[2]) {
      const excessive = data.filter(date => Number(date.caffeineSum) > 400);
      return excessive;
    } else return data;
  };

  return (
    <Container>
      <FilterContainer className={Flex}>
        {filter.map(item => (
          <FilterBtn
            key={item}
            value={item}
            onClick={handleOnClick}
            className={cx(
              isSelected === item ? BtnColorMain : BtnColorBorder,
              Medium
            )}>
            {item}
          </FilterBtn>
        ))}
      </FilterContainer>
      <HistoryList>
        <Count className={Medium}>
          <span>{count[0]}</span>
          <CountNum className={Semibold}>{data?.summary.length}</CountNum>
          <span>{count[1]}</span>
        </Count>
        {data &&
          handleFilteringData(data?.summary).map(dailyRecord => (
            <React.Fragment key={dailyRecord.day}>
              <div className={cx(Flex, Between, Align)}>
                <Date className={Medium}>{handleDate(dailyRecord.day)}</Date>
                <Caffeiene
                  className={Bold}
                  style={caffeineSumState(dailyRecord.caffeineSum)}>
                  {dailyRecord.caffeineSum}
                  {suf}
                </Caffeiene>
              </div>
              <DailyRecord className={Column}>
                {data?.details[dailyRecord.day].map(
                  (recodes: CaffeineIntakeTypes, idx: number) => (
                    <DailyRecordItem
                      key={idx}
                      className={cx(Flex, Between, Gap12)}>
                      <Logo
                        src={`/png/${recodes.brand}.png`}
                        alt={recodes.brand}
                      />
                      <div className={cx(Column, FlexGrow)}>
                        {/* <span className={Semibold}>{recodes.productName}</span> */}
                        <span className={Semibold}>{recodes.menu}</span>
                        <CoffeeOption>
                          ({coffeeInfoFormatter(recodes).coffeeInfo[2]})
                        </CoffeeOption>
                      </div>
                      <span className={cx(Semibold, Align)}>
                        {pre}
                        {recodes.caffeine}
                        {suf}
                      </span>
                    </DailyRecordItem>
                  )
                )}
              </DailyRecord>
            </React.Fragment>
          ))}
      </HistoryList>
    </Container>
  );
};
const Container = styled.div`
  margin-top: 32px;
  max-width: 500px;
`;
const FilterContainer = styled.div`
  gap: 6px;
`;
const FilterBtn = styled.button`
  height: 34px;
  width: 53px;
  border-radius: 50px;
  line-height: 24px;
  font-size: var(--font-sizes-sm);
`;
const HistoryList = styled.div`
  margin-top: 24px;
`;
const Count = styled.div`
  height: 33px;
  width: 100%;
  margin-bottom: 22px;
  border-bottom: solid 1px var(--colors-border-grey);
  color: var(--colors-mid-grey);
`;
const CountNum = styled.span`
  color: var(--colors-main-dark);
`;

const Date = styled.span`
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
`;
const Caffeiene = styled.span`
  font-size: var(--font-sizes-base);
`;

const DailyRecord = styled.div`
  margin: 18px 0 30px 0;
  gap: 12px;
`;

const DailyRecordItem = styled.div`
  height: 56px;
  padding: 8px 0;
  font-size: var(--font-sizes-base);
  color: var(--colors-main-dark);
`;
const Logo = styled.img`
  width: 40px;
`;
const CoffeeOption = styled.span`
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
`;
export default CaffieneHistory;
