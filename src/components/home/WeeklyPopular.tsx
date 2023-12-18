import WeeklyPopularItem from '@/components/home/WeeklyPopularItem';
import { WeeklyPopularTypes } from '@/types/types';

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
  return (
    <div>
      <div>이번주 인기 브랜드</div>
      {data.map(item => (
        <WeeklyPopularItem data={item} />
      ))}
    </div>
  );
};

export default WeeklyPopular;
