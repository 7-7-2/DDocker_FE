import Icon from '@/components/common/Icon';
import PostedAt from '@/components/post/PostedAt';
import PostSocialCount from '@/components/post/PostSocialCount';

import { useLikeOnPost } from '@/hooks/post/useLikeOnPost';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { Flex, Between, Column, Align } from '@/styles/layout';
import { Gap12, PostContainer, PostsContainer } from '@/styles/styles';

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
      <div className={cx(Column, Gap12)}>
        <div className={cx(Flex, Align, Gap12)}>
          <PostSocialCount
            count={likes}
            icon={myLike && myLike.liked ? 'liked' : 'like'}
            onClick={handleLikeOnPost}
          />
          <PostSocialCount
            count={comments}
            icon={'comments'}
            onClick={onClick}
          />
        </div>
        {posts && (
          <PostedAt
            at={createdAt}
            posts={posts}
          />
        )}
      </div>
      {!posts && (
        <Icon
          {...iconPropsGenerator('share')}
          onClick={postId && handleShare(storagePath, postId)}
        />
      )}
    </div>
  );
};

export default PostSocial;
