import PostSocialCount from '@/components/post/PostSocialCount';
import Icon from '@/components/common/Icon';
import PostedAt from '@/components/post/PostedAt';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { PostContainer, PostsContainer } from '@/styles/styles';
import { Flex, Between } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { useQuery } from '@tanstack/react-query';
import { getMyLikeOnPost } from '@/api/likes';

const PostSocial = ({
  posts,
  likes,
  comments,
  createdAt,
  postId
}: {
  posts?: boolean;
  likes: number;
  comments: number;
  createdAt?: string | undefined;
  postId?: string;
}) => {
  const { data: myLike } = useQuery({
    queryKey: ['myLike', postId],
    queryFn: () => {
      return getMyLikeOnPost(postId as string);
    },
    enabled: !!postId
  });

  return (
    <div className={cx(Flex, Between, posts ? PostsContainer : PostContainer)}>
      {myLike && (
        <div className={Flex}>
          <PostSocialCount
            count={likes}
            icon={myLike.success ? 'liked' : 'like'}
          />
          <PostSocialCount
            count={comments}
            icon={'comments'}
          />
        </div>
      )}
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
