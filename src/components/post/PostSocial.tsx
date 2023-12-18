import PostSocialCount from '@/components/post/PostSocialCount';
import Icon from '@/components/common/Icon';
import PostedAt from '@/components/post/PostedAt';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { PostContainer, PostsContainer } from '@/styles/styles';
import { Flex, Between } from '@/styles/layout';
import { cx } from 'styled-system/css';

const PostSocial = ({ posts = false }: { posts?: boolean }) => {
  return (
    <div className={cx(Flex, Between, posts ? PostsContainer : PostContainer)}>
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
