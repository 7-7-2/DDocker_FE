import { useState, lazy, Suspense } from 'react';
import PostTabs from '@/components/posts/PostsTabs';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { TABS_TEXTS } from '@/constants/common';
import { Divider } from '@/styles/styles';

const PostsTrend = lazy(() => import('../components/posts/trend/PostsTrend'));
const PostsFollowing = lazy(
  () => import('../components/posts/following/PostsFollowing')
);

export const Posts = () => {
  useComposeHeader('logo', '', 'icons');
  const [postsTab, setPostsTab] = useState(TABS_TEXTS.trend[0]);

  return (
    <>
      <PostTabs
        setPostsTab={setPostsTab}
        postsTab={postsTab}
      />
      <div className={Divider} />
      {postsTab === TABS_TEXTS.trend[0] && (
        <Suspense>
          <PostsTrend />
        </Suspense>
      )}
      {postsTab === TABS_TEXTS.following[0] && (
        <Suspense>
          <PostsFollowing />
        </Suspense>
      )}
    </>
  );
};

export default Posts;
