import { authInstance } from '@/api/axios';

const [API] = [import.meta.env.VITE_BASE_URL];

// 1. 게시글 좋아요
export const likePost = async (postId: string) => {
  const res = await authInstance.post(`${API}likes/${postId}`);
  return res.data;
};
// 2. 게시글 좋아요 취소
export const undoLikePost = async (postId: string) => {
  const res = await authInstance.delete(`${API}likes/${postId}`);
  return res.data;
};
