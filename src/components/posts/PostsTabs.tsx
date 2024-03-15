import { Align } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import PostTab from '@/components/posts/PostsTab';
import { TABS_TEXTS } from '@/constants/texts';

const PostsTabs = ({
  setPostsTab
}: {
  setPostsTab: (postsTab: string) => void;
}) => {
  const handleTrend = () => setPostsTab(TABS_TEXTS.trend[0]);
  const handleFollowing = () => setPostsTab(TABS_TEXTS.following[0]);

  return (
    <Container className={Align}>
      <PostTab
        tab={TABS_TEXTS.trend[1]}
        onClick={handleTrend}
      />
      <PostTab
        tab={TABS_TEXTS.following[1]}
        onClick={handleFollowing}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 40px;
`;

export default PostsTabs;
