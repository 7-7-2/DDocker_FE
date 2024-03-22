import PostsBrandPopular from '@/components/posts/trend/PostsBrandPopular';
import PostsDailyPopular from '@/components/posts/trend/PostsDailyPopular';
import BrandCarousel from '@/components/posts/trend/carousel/BrandCarousel';
import { PaddingB20, PaddingT20, TrendDivider } from '@/styles/styles';
import { cx } from 'styled-system/css';

const PostsTrend = () => {
  return (
    <div className={cx(PaddingT20, PaddingB20)}>
      <PostsDailyPopular />
      <div className={TrendDivider} />
      <BrandCarousel />
      <PostsBrandPopular />
    </div>
  );
};

export default PostsTrend;
