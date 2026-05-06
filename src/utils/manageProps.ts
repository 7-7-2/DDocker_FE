import { FollowingPost } from '@/types/types';

export const generatePostCardProps = (
  post: FollowingPost,
  id: string,
  idx: number,
  selected?: string
) => {
  return {
    key: id + idx,
    nickname: post.nickname,
    userSum: post.userSum,
    description: post.description,
    postId: post.postId,
    profileUrl: post.profileUrl,
    createdAt: post.createdAt,
    photo: post.photo,
    caffeine: post.caffeine,
    shot: post.shot,
    productName: post.productName,
    brand: selected ? selected : post.brand,
    userId: post.userId,
    intensity: post.intensity,
    size: post.size
  };
};
