import CafeDetailContent from '@/components/post/CafeDetailContent';
import DailyTrendImage from '@/components/posts/trend/DailyTrendImage';
import { Column } from '@/styles/layout';
import { PaddingR8 } from '@/styles/styles';
import { cx } from 'styled-system/css';
import { DailyTrendCardProps } from '@/types/types';

const DailyTrendCard = ({ post }: { post: DailyTrendCardProps }) => {
  return (
    <div className={cx(Column, PaddingR8)}>
      <DailyTrendImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGZF8p4ggPBQ4JJXhog2-fiN2R13u91jOsfw&usqp=CAU" />
      <CafeDetailContent
        mini={true}
        posts={true}
        {...post}
      />
    </div>
  );
};

export default DailyTrendCard;
