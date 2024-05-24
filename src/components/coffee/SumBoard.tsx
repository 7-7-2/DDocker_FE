import SumByType from '@/components/coffee/SumByType';
import { COFFEE_TEXTS } from '@/constants/coffee';
import { styled } from 'styled-system/jsx';
import { Between, Column, Flex } from '@/styles/layout';
import { SumBoardTitle, SumType, Blur } from '@/styles/styles';
import { cx } from 'styled-system/css';

const { intake, cups, unit, coffee, caffeine, year, month } = COFFEE_TEXTS;

const SumBoard = ({
  period,
  coffeeAmount,
  caffeineAmount,
  blur = false
}: {
  period: string | number;
  coffeeAmount: number;
  caffeineAmount: number;
  blur?: boolean;
}) => {
  const MonthPredi = typeof period === 'number' && period < 13;
  const YearPredi = typeof period === 'number' && period > 13;
  return (
    <Container>
      <div className={blur ? cx(SumBoardTitle, Blur) : SumBoardTitle}>
        {period}
        {MonthPredi && month}
        {YearPredi && year} {intake}
      </div>

      <InfoArea className={cx(Flex, Between)}>
        <InfoItem className={Column}>
          <div className={blur ? cx(SumType, Blur) : SumType}>{coffee}</div>
          <SumByType
            amount={coffeeAmount}
            unit={cups}
            blur={blur}
          />
        </InfoItem>
        <Divider />
        <InfoItem className={Column}>
          <div className={blur ? cx(SumType, Blur) : SumType}>{caffeine}</div>
          <SumByType
            amount={caffeineAmount}
            unit={unit}
            blur={blur}
          />
        </InfoItem>
      </InfoArea>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 12px;
  padding: 16px 20px;
  background-color: var(--colors-tertiary);
  border-radius: 16px;
`;

const InfoArea = styled.div`
  position: relative;
  padding: 0 10px;
  margin-top: 6px;
`;

const InfoItem = styled.div`
  width: 126px;
  align-items: flex-start;
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
