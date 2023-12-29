import SumBoard from '@/components/coffee/SumBoard';
import { COFFEE_TEXTS } from '@/constants/coffee';
import { cx } from 'styled-system/css';
import { SumTitle, PaddingT22 } from '@/styles/styles';

const { sum } = COFFEE_TEXTS;

const MyCoffeeSum = () => {
  return (
    <>
      <h2 className={cx(SumTitle, PaddingT22)}>{sum}</h2>
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

export default MyCoffeeSum;
