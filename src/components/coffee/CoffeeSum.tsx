import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Center, Column, Grid } from '@/styles/layout';
import { Bold, BorderRight } from '@/styles/styles';

const { coffeeSum, unit } = COFFEE_ANALYSIS_TEXTS;
const CoffeeSum = ({ data }: { data: number[] }) => {
  return (
    <Container className={Grid}>
      {coffeeSum.text.map((item, idx) => (
        <div
          key={item}
          className={cx(
            Column,
            Center,
            coffeeSum.text.length - 1 !== idx && BorderRight
          )}>
          <span className={Bold}>
            {data[idx]}
            {coffeeSum.text.length - 1 !== idx ? unit.cup : unit.day}
          </span>
          <Text>{item}</Text>
        </div>
      ))}
    </Container>
  );
};
const Container = styled.div`
  height: 80px;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 10px;
  line-height: 24px;
  font-size: var(--font-sizes-base);
  background-color: var(--colors-main);
  color: #fff;
`;

const Text = styled.span`
  font-size: var(--font-sizes-xs);
`;
export default CoffeeSum;
