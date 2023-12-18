import SumBoard from '@/components/coffee/SumBoard';
import { COFFEE_TEXTS } from '@/constants/coffee';
import { styled } from 'styled-system/jsx';
import { Semibold } from '@/styles/styles';

const { sum } = COFFEE_TEXTS;

const MyCoffeeSum = () => {
  return (
    <>
      <Title className={Semibold}>{sum}</Title>
      <SumBoard
        period="이번 주"
        coffeeAmount={20}
        caffeineAmount={3367}
      />
      <SumBoard
        period={12}
        coffeeAmount={209}
        caffeineAmount={33677}
      />

      <SumBoard
        period={2023}
        coffeeAmount={1554}
        caffeineAmount={252646}
      />
    </>
  );
};

const Title = styled.h2`
  padding-top: 22px;
  font-size: var(--font-sizes-lg);
  line-height: 26px;
`;

export default MyCoffeeSum;
