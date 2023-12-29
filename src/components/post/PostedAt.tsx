import { PaddingTBMix, CafeMedium } from '@/styles/styles';
import { cx } from 'styled-system/css';

const PostedAt = ({ at, posts = false }: { at: string; posts?: boolean }) => {
  return (
    <div className={cx(posts ? '' : PaddingTBMix, CafeMedium)}>{at}분 전</div>
  );
};

export default PostedAt;
