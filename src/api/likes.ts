import { authInstance } from "@/api/axiosInterceptor";

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
