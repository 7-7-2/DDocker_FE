import { useComposeHeader } from '@/hooks/useComposeHeader';
import { styled } from 'styled-system/jsx';
import { useState, lazy } from 'react';
import PostTabs from '@/components/posts/PostsTabs';
import { TABS_TEXTS } from '@/constants/texts';
import { Divider } from '@/styles/styles';

const PostsFollowing = lazy(
  () => import('../components/posts/following/PostsFollowing')
);
const PostsTrend = lazy(() => import('../components/posts/trend/PostsTrend'));

export const Posts = () => {
  useComposeHeader(true, '', 'icons');
  const [postsTab, setPostsTab] = useState(TABS_TEXTS.trend[0]);

  return (
    <>
      <PostTabs
        setPostsTab={setPostsTab}
        postsTab={postsTab}
      />
      <div className={Divider} />

      {postsTab === TABS_TEXTS.trend[0] && <PostsTrend />}
      {postsTab === TABS_TEXTS.following[0] && <PostsFollowing />}
    </>
  );
};

export default Posts;
