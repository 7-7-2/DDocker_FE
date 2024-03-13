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

const MyCoffeeSum = ({ signedIn }: { signedIn: string | null }) => {
  const { data: coffeeIntake } = useQuery({
    queryKey: ['coffeeIntake'],
    queryFn: getCoffeeIntake,
    enabled: !!signedIn
  });

  return (
    <>
      {signedIn && coffeeIntake && coffeeIntake.setRes && (
        <>
          <h2 className={cx(SumTitle, PaddingT22)}>{sum}</h2>
          <SumBoard
            period={week}
            coffeeAmount={coffeeIntake.setRes.WEEK[0].CountSum}
            caffeineAmount={coffeeIntake.setRes.WEEK[0].CaffeineSum}
          />
          <SumBoard
            period={month}
            coffeeAmount={coffeeIntake.setRes.MONTH[0].CountSum}
            caffeineAmount={coffeeIntake.setRes.MONTH[0].CaffeineSum}
          />
          <SumBoard
            period={year}
            coffeeAmount={coffeeIntake.setRes.YEAR[0].CountSum}
            caffeineAmount={coffeeIntake.setRes.YEAR[0].CaffeineSum}
          />
        </>
      )}
      {!signedIn && (
        <>
          <h2 className={cx(SumTitle, PaddingT22)}>{sum}</h2>
          <>
            <SumBoard
              period={week}
              coffeeAmount={0}
              caffeineAmount={0}
              blur={true}
            />
            <SumBoard
              period={month}
              coffeeAmount={0}
              caffeineAmount={0}
              blur={true}
            />
            <SumBoard
              period={year}
              coffeeAmount={0}
              caffeineAmount={0}
              blur={true}
            />
          </>
        </>
      )}
    </>
  );
};

export default MyCoffeeSum;
