import PostSocialCount from '@/components/post/PostSocialCount';
import Icon from '@/components/common/Icon';
import PostedAt from '@/components/post/PostedAt';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { PostContainer, PostsContainer } from '@/styles/styles';
import { Flex, Between } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { useLikeOnPost } from '@/hooks/useLikeOnPost';

const PostSocial = ({
  posts,
  likes,
  comments,
  createdAt,
  postId,
  onClick
}: {
  posts?: boolean;
  likes: number;
  comments: number;
  createdAt?: string | undefined;
  postId?: string;
  onClick: () => void;
}) => {
  //myLike && 조건 수정 필요 => 비로그인 유저 조회 불가?
  const { myLike, handleLikeOnPost } = useLikeOnPost(postId);

  return (
    <div className={cx(Flex, Between, posts ? PostsContainer : PostContainer)}>
      <div className={Flex}>
        <PostSocialCount
          count={likes}
          icon={myLike && myLike.success ? 'liked' : 'like'}
          onClick={handleLikeOnPost}
        />
        <PostSocialCount
          count={comments}
          icon={'comments'}
          onClick={onClick}
        />
      </div>

      {!posts && <Icon {...iconPropsGenerator('share')} />}
      {posts && (
        <PostedAt
          at={createdAt}
          posts={posts}
        />
      )}
    </div>
  );
};

export default PostSocial;
