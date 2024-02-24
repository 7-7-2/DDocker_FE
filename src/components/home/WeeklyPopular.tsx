import WeeklyPopularItem from '@/components/home/WeeklyPopularItem';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { WeeklyPopularTypes } from '@/types/types';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Grid } from '@/styles/layout';
import { SmStyle, SumTitle, MarginT12 } from '@/styles/styles';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useEffect, useState } from 'react';
import { getWeeklyPopular } from '@/api/post';

const WeeklyPopular = () => {
  const [brandList, setBrandList] = useState<WeeklyPopularTypes[]>();
  const { weeklyPopular } = TODAY_CAFFEINE_INFO_TEXTS;

  const getWeeklyPopularList = async () => {
    const res = await useGetCacheData('brand', '/WeeklyPopular');
    if (!res) {
      const res = await getWeeklyPopular();
      setBrandList(res);
      return;
    }
    setBrandList(res.cacheData);
  };

  useEffect(() => {
    getWeeklyPopularList();
  }, []);

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
