import WeeklyPopularItem from '@/components/home/WeeklyPopularItem';
import { useGetPopularList } from '@/hooks/useGetPopularList';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Grid } from '@/styles/layout';
import { SmStyle, SumTitle, MarginT12 } from '@/styles/styles';

const { weeklyPopular } = TODAY_CAFFEINE_INFO_TEXTS;

const WeeklyPopular = () => {
  const brandList = useGetPopularList();

  return (
    <div>
      <div className={SumTitle}>{weeklyPopular}</div>
      <WeeklyPopularList className={cx(Grid, SmStyle, MarginT12)}>
        {brandList &&
          brandList.map((item, idx) => (
            <WeeklyPopularItem
              data={item}
              idx={idx}
              key={item.brand}
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
