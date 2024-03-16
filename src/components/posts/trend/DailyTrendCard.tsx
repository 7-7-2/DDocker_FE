import CafeDetailContent from '@/components/post/CafeDetailContent';
import DailyTrendImage from '@/components/posts/trend/DailyTrendImage';
import { Column } from '@/styles/layout';
import { PaddingR8 } from '@/styles/styles';
import { cx } from 'styled-system/css';

const PROPS = {
  brand: '스타벅스',
  menu: '카라멜 프라푸치노',
  shot: 2,
  caffeine: 255,
  posts: true
};
// useQuery => 1. new API DailyTrendData 2.
const DailyTrendCard = () => {
  return (
    <div className={cx(Column, PaddingR8)}>
      <DailyTrendImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGZF8p4ggPBQ4JJXhog2-fiN2R13u91jOsfw&usqp=CAU" />
      <CafeDetailContent
        mini={true}
        {...PROPS}
      />
    </div>
  );
};

export default DailyTrendCard;
