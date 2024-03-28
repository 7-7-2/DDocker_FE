import WeeklyPopularItem from '@/components/home/WeeklyPopularItem';
import { useGetPopularList } from '@/hooks/home/useGetPopularList';
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
      <Dividerline />
      <WeeklyPopularTitle className={SumTitle}>
        {weeklyPopular}
      </WeeklyPopularTitle>
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

const WeeklyPopularTitle = styled.div`
  margin-top: 24px;
`;
const WeeklyPopularList = styled.div`
  gap: 8px 0;
`;

const Dividerline = styled.div`
  width: 100vw;
  margin-left: -20px;
  border-top: 8px solid #fff;
`;
export default WeeklyPopular;
