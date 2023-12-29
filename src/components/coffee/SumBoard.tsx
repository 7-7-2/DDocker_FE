import SumByType from '@/components/coffee/SumByType';
import { COFFEE_TEXTS } from '@/constants/coffee';
import { styled } from 'styled-system/jsx';
import { Column, Evenly, Flex } from '@/styles/layout';
import { SumBoardTitle, SumType } from '@/styles/styles';
import { cx } from 'styled-system/css';

const { intake, cups, unit, coffee, caffeine, year, month } = COFFEE_TEXTS;

const SumBoard = ({
  period,
  coffeeAmount,
  caffeineAmount
}: {
  period: string | number;
  coffeeAmount: number;
  caffeineAmount: number;
}) => {
  const MonthPredi = typeof period === 'number' && period < 13;
  const YearPredi = typeof period === 'number' && period > 13;
  return (
    <Container>
      <div className={SumBoardTitle}>
        {period}
        {MonthPredi && month}
        {YearPredi && year} {intake}
      </div>

      <InfoArea className={cx(Flex, Evenly)}>
        <div className={Column}>
          <div className={SumType}>{coffee}</div>
          <SumByType
            amount={coffeeAmount}
            unit={cups}
          />
        </div>
        <Divider />
        <div className={Column}>
          <div className={SumType}>{caffeine}</div>
          <SumByType
            amount={caffeineAmount}
            unit={unit}
          />
        </div>
      </InfoArea>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 12px;
  padding: 16px;
  background-color: var(--colors-tertiary);
  border-radius: 16px;
`;

const InfoArea = styled.div`
  position: relative;
`;

const Divider = styled.div`
  &::before {
    content: '';
    right: 50%;
    border-right: 1px solid #dbdbdb;
    position: absolute;
    height: 45px;
  }
`;

export default SumBoard;
