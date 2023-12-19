import WeeklyPopularItem from '@/components/home/WeeklyPopularItem';
import { WeeklyPopularTypes } from '@/types/types';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Grid } from '@/styles/layout';
import { Medium, Semibold } from '@/styles/styles';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';

const data: WeeklyPopularTypes[] = [
  {
    ranking: 1,
    brand: { icon: 'icon', brand: '스타벅스' }
  },
  {
    ranking: 2,
    brand: { icon: 'icon', brand: '이디야' }
  },
  {
    ranking: 3,
    brand: { icon: 'icon', brand: '할리스' }
  },
  {
    ranking: 4,
    brand: { icon: 'icon', brand: '빽다방' }
  },
  {
    ranking: 5,
    brand: { icon: 'icon', brand: '투썸플레이스' }
  }
];

const WeeklyPopular = () => {
  const { weeklyPopular } = TODAY_CAFFEINE_INFO_TEXTS;
  return (
    <Container>
      <div className={Semibold}>{weeklyPopular}</div>
      <WeeklyPopularList className={cx(Grid, Medium)}>
        {data.map(item => (
          <div key={item.ranking}>
            <WeeklyPopularItem data={item} />
          </div>
        ))}
      </WeeklyPopularList>
    </Container>
  );
};

export default WeeklyPopular;

const WeeklyPopularList = styled.div`
  font-size: var(--font-sizes-base);
  margin-top: 12px;
  gap: 8px 0;
`;
const Container = styled.div`
  color: #313131;
  font-size: var(--font-sizes-lg);
`;
