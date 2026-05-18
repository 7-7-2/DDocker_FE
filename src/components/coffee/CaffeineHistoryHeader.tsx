import { useRecoilValue } from 'recoil';

import { convertDateFormmater } from '@/utils/convertDateFormmater';
import { activeMonthState } from '@/atoms/atoms';
import { CalendarData } from '@/types/types';
import { COFFEE_HISTORY_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Bold, Medium } from '@/styles/styles';
import { Align, Between, Flex } from '@/styles/layout';

const { suf } = COFFEE_HISTORY_TEXTS;
const CaffeineHistoryHeader = ({
  dailyRecord
}: {
  dailyRecord: CalendarData;
}) => {
  const activeMonth = Number(useRecoilValue(activeMonthState)?.split('-')[1]);

  const caffeineSumState = (caffeineSum: string) => {
    const caffeine = Number(caffeineSum);
    if (caffeine <= 400) return { color: 'var(--colors-recommended)' };
    if (caffeine > 400) return { color: 'var(--colors-delete-red)' };
    return { color: 'var(--colors-main-dark)' };
  };
  return (
    <div className={cx(Flex, Between, Align)}>
      <Date className={Medium}>
        {convertDateFormmater(activeMonth, dailyRecord.day)}
      </Date>
      <Caffeiene
        className={Bold}
        style={caffeineSumState(dailyRecord.caffeineSum)}>
        {dailyRecord.caffeineSum}
        {suf}
      </Caffeiene>
    </div>
  );
};

const Date = styled.span`
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
`;
const Caffeiene = styled.span`
  font-size: var(--font-sizes-base);
`;

export default CaffeineHistoryHeader;
