import PostSocialCount from '@/components/post/PostSocialCount';
import Icon from '@/components/common/Icon';
import PostedAt from '@/components/post/PostedAt';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { PostContainer, PostsContainer } from '@/styles/styles';
import { Flex, Between } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { useLikeOnPost } from '@/hooks/post/useLikeOnPost';

const imagePath = import.meta.env.VITE_R2_POST_IMAGE_PATH;

const PostSocial = ({
  posts,
  likes,
  comments,
  createdAt,
  postId,
  userId,
  onClick
}: {
  posts?: boolean;
  likes: number;
  comments: number;
  createdAt?: string | undefined;
  postId?: string;
  userId?: string;
  onClick?: () => void;
}) => {
  const { myLike, handleLikeOnPost } = useLikeOnPost(postId);
  const storagePath = `${imagePath}%2F${userId}%2F${postId}`;

  const handleShare = (imageUrl: string, postId: string) => async () => {
    const fetchedImage = await fetch(imageUrl).catch(e => {
      console.log(e);
    });
    const blobImage = fetchedImage && (await fetchedImage?.blob());
    const filesArray = blobImage && [
      new File([blobImage], postId + '.webp', {
        type: 'image/webp',
        lastModified: Date.now()
      })
    ];
    const shareData = {
      title: postId + '.webp',
      files: filesArray as File[],
      url: document.location.href
    };
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.clipboard.writeText(document.location.href);
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(document.location.href);
    }
    return;
  };

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

      {!posts && (
        <Icon
          {...iconPropsGenerator('share')}
          onClick={postId && handleShare(storagePath, postId)}
        />
      )}
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
