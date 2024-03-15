import PostSocialCount from '@/components/post/PostSocialCount';
import Icon from '@/components/common/Icon';
import PostedAt from '@/components/post/PostedAt';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { PostContainer, PostsContainer } from '@/styles/styles';
import { Flex, Between } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getMyLikeOnPost, likePost, undoLikePost } from '@/api/likes';
import useGetCacheData from '@/hooks/useGetCacheData';

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
  const queryClient = useQueryClient();
  const { data: signedIn } = useQuery({
    queryKey: ['signedIn'],
    queryFn: () => useGetCacheData('user', '/accessToken')
  });

  const { data: myLike } = useQuery({
    queryKey: ['myLike', postId],
    queryFn: () => {
      return getMyLikeOnPost(postId as string);
    },
    enabled: !!postId && !!signedIn
  });

  const toggleLike = myLike && myLike.success ? undoLikePost : likePost;
  const { mutate } = useMutation({ mutationFn: toggleLike });
  const handleLikeOnPost = () => {
    mutate(postId as string, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['socialCounts', postId] });
        queryClient.invalidateQueries({ queryKey: ['myLike', postId] });
      }
    });
  };

  //myLike && 조건 수정 필요 => 비로그인 유저 조회 불가?
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
