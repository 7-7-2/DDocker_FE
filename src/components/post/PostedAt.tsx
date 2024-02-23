import { PaddingTBMix, CafeMedium } from '@/styles/styles';
import { cx } from 'styled-system/css';

const PostedAt = ({ at, posts = false }: { at: string; posts?: boolean }) => {
  return <Posted className={posts ? '' : PaddingPost}>{at}</Posted>;
};

const Posted = styled.div`
  font-size: var(--font-sizes-xs);
  line-height: 20px;
  color: #767676;
`;

const PaddingPost = css`
  padding-top: 12px;
  padding-bottom: 20px;
`;

export default PostedAt;
