import WeeklyPopularItem from '@/components/home/WeeklyPopularItem';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { WeeklyPopularTypes } from '@/types/types';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Grid } from '@/styles/layout';
import { SmStyle, SumTitle, MarginT12 } from '@/styles/styles';

const data: WeeklyPopularTypes[] = [
  {
    ranking: 1,
    brand: 'starbucks'
  },
  {
    ranking: 2,
    brand: 'compose'
  },
  {
    ranking: 3,
    brand: 'hollys'
  },
  {
    ranking: 4,
    brand: 'ediya'
  },
  {
    ranking: 5,
    brand: 'megacoffee'
  }
];

const WeeklyPopular = () => {
  const { weeklyPopular } = TODAY_CAFFEINE_INFO_TEXTS;
  return (
    <div>
      <div className={SumTitle}>{weeklyPopular}</div>
      <WeeklyPopularList className={cx(Grid, SmStyle, MarginT12)}>
        {data.map(item => (
          <WeeklyPopularItem
            data={item}
            key={item.ranking}
          />
        ))}
      </WeeklyPopularList>
    </div>
  );
};

const WeeklyPopularList = styled.div`
  gap: 8px 0;
`;

export default WeeklyPopular;
