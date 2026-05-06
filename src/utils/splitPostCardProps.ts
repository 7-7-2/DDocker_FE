import { FollowingPost } from '@/types/types';

export const splitPostCardProps = ({ ...props }: FollowingPost) => {
  const {
    nickname,
    userSum,
    description,
    postId,
    userId,
    profileUrl,
    createdAt,
    photo,
    caffeine,
    shot,
    productName,
    brand,
    intensity,
    size
  } = props;

  const PostBodyProps = {
    description,
    photo,
    caffeine,
    shot,
    productName,
    brand,
    intensity,
    size
  };

  const MiniProfileProps = {
    url: profileUrl,
    nickname,
    caffeineSum: userSum,
    userId
  };
  return { postId, createdAt, PostBodyProps, MiniProfileProps };
};
