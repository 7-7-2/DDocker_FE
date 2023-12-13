import { useComposeHeader } from '@/hooks/useComposeHeader';

export const Posts = () => {
  useComposeHeader(true, '', 'icons');

  return <>POSTS</>;
};

export default Posts;
