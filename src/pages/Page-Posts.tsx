import { useComposeHeader } from '@/hooks/useComposeHeader';
import { styled } from 'styled-system/jsx';
import { useState, lazy } from 'react';
import PostTabs from '@/components/posts/PostTabs';
import { TABS_TEXTS } from '@/constants/texts';

const PostsFollowing = lazy(() => import('../components/posts/PostsFollowing'));
const PostsTrend = lazy(() => import('../components/posts/PostsTrend'));

export const Posts = () => {
  useComposeHeader(true, '', 'icons');
  const [postsTab, setPostsTab] = useState(TABS_TEXTS.trend[0]);

  return (
    <>
      <PostTabs setPostsTab={setPostsTab} />

      {postsTab === TABS_TEXTS.trend[0] && <PostsTrend />}
      {postsTab === TABS_TEXTS.following[0] && <PostsFollowing />}
    </>
  );
};

export default Posts;
