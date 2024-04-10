import SumBoard from '@/components/coffee/SumBoard';
import { COFFEE_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { SumTitle, PaddingT22 } from '@/styles/styles';
import { useGetMyCoffeeSum } from '@/hooks/coffee/useGetMyCoffeeSum';

const { sum } = COFFEE_TEXTS;

const MyCoffeeSum = ({ signedIn }: { signedIn: string | null }) => {
  const { periods, coffeeIntake } = useGetMyCoffeeSum(signedIn);

  return (
    <>
      <h2 className={cx(SumTitle, PaddingT22)}>{sum}</h2>
      {periods.map(({ label, key }) => (
        <SumBoard
          key={key}
          period={label}
          coffeeAmount={
            signedIn && coffeeIntake && coffeeIntake.setRes
              ? coffeeIntake.setRes[key][0].CountSum
              : 0
          }
          caffeineAmount={
            signedIn && coffeeIntake && coffeeIntake.setRes
              ? coffeeIntake.setRes[key][0].CaffeineSum
              : 0
          }
          blur={!signedIn}
        />
      ))}
    </>
  );
};

export default MyCoffeeSum;
