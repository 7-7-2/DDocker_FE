import PostSocialCount from '@/components/post/PostSocialCount';
import { Flex, Between } from '@/styles/layout';
import { cx } from 'styled-system/css';
import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import PostedAt from '@/components/post/PostedAt';
import { PostContainer, PostsContainer } from '@/styles/styles';

const PostSocial = ({ posts = false }: { posts?: boolean }) => {
  return (
    <div
      className={
        posts
          ? cx(Flex, Between, PostsContainer)
          : cx(Flex, Between, PostContainer)
      }>
      <div className={Flex}>
        <PostSocialCount
          count={0}
          icon={'like'}
        />
        <PostSocialCount
          count={0}
          icon={'comments'}
        />
      </div>
      {!posts && <Icon {...iconPropsGenerator('share')} />}
      {posts && (
        <PostedAt
          at={'30'}
          posts={posts}
        />
      )}
    </div>
  );
};

export default PostSocial;
