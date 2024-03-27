import SumBoard from '@/components/coffee/SumBoard';
import { COFFEE_TEXTS } from '@/constants/coffee';
import { cx } from 'styled-system/css';
import { SumTitle, PaddingT22 } from '@/styles/styles';
import { useQuery } from '@tanstack/react-query';
import { getCoffeeIntake } from '@/api/coffee';

const { sum, week } = COFFEE_TEXTS;
const cur = new Date();
const year = cur.getFullYear();
const month = cur.getMonth() + 1;

const periods = [
  { label: week, key: 'WEEK' },
  { label: month, key: 'MONTH' },
  { label: year, key: 'YEAR' }
];

const MyCoffeeSum = ({ signedIn }: { signedIn: string | null }) => {
  const { data: coffeeIntake } = useQuery({
    queryKey: ['coffeeIntake'],
    queryFn: getCoffeeIntake,
    enabled: !!signedIn
  });

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
