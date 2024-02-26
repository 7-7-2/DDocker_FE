import { authInstance } from '@/api/axiosInterceptor';

// 1. 게시글 좋아요
export const likePost = async (postId: string) => {
  const res = await authInstance.post(`/likes/${postId}`);
  return res.data;
};
// 2. 게시글 좋아요 취소
export const undoLikePost = async (postId: string) => {
  const res = await authInstance.delete(`/likes/${postId}`);
  return res.data;
};
// 3. 인증된 사용자가 게시글의 본인 좋아요 확인(게시글 진입시)
export const getMyLikeOnPost = async (postId: string) => {
  const res = await authInstance.get(`/likes/${postId}`);
  return res.data;
};
