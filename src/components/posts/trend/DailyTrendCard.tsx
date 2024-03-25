import CafeDetailContent from '@/components/post/CafeDetailContent';
import DailyTrendImage from '@/components/posts/trend/DailyTrendImage';
import { Column } from '@/styles/layout';
import { PaddingR8 } from '@/styles/styles';
import { cx } from 'styled-system/css';
import { DailyTrendCardProps } from '@/types/types';
import { getBrandPath } from '@/utils/getBrandPath';
import { useNavigateTo } from '@/hooks/useNavigateTo';

const DailyTrendCard = ({ post }: { post: DailyTrendCardProps }) => {
  const navigate = (path: string) => useNavigateTo(`/post/${path}`);
  const toPost = navigate(post.postId);
  return (
    <div className={cx(Column, PaddingR8)}>
      <DailyTrendImage
        src={post.photo}
        onClick={toPost}
        postId={post.postId}
      />
      <CafeDetailContent
        mini={true}
        posts={true}
        brand={getBrandPath(post.brand)}
        menu={post.menu}
        shot={post.shot}
        caffeine={post.caffeine}
        onTouchEnd={toPost}
      />
    </div>
  );
};

export default DailyTrendCard;
