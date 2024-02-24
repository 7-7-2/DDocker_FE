import { authInstance, baseInstance } from '@/api/axiosInterceptor';
import useSetCacheData from '@/hooks/useSetCacheData';
import { TodayPostTypes } from '@/types/types';

interface PostForm {}
interface Comment {}

// 1. 포스트 조회
export const getPostDetail = async (postId: string) => {
  const res = await baseInstance.get(`/posts/${postId}`);
  return res.data;
};

// 2. 포스트 등록(+JWT 인증)
export const registerPost = async (postForm: PostForm) => {
  const res = await authInstance.post(`/posts/register`, postForm);
  return res.data;
};

// 3. 포스트 삭제(+JWT 인증)
export const deletePost = async (postId: string) => {
  const res = await authInstance.delete(`/posts/${postId}`);
  return res.data;
};

// 4. 포스트 수정(+JWT 인증)
export const updatePost = async (
  postId: string,
  postForm: Partial<PostForm>
) => {
  const res = await authInstance.patch(`/posts/${postId}`, postForm);
  return res.data;
};

// 5. 댓글 작성(+JWT 인증)
export const writeComment = async (postId: string, comment: Comment) => {
  const res = await authInstance.post(`/posts/${postId}/comments`, comment);
  return res.data;
};

// 6. 댓글 삭제(+JWT 인증)
export const deleteComment = async (postId: string, commentId: number) => {
  const res = await authInstance.delete(
    `/posts/${postId}/comments/${commentId}`
  );
  return res.data;
};

// 7. 답글 작성(+JWT 인증)
export const replyComment = async (commentId: number) => {
  const res = await authInstance.post(`/posts/${commentId}/reply`);
  return res.data;
};

// 8. 답글 삭제(+JWT 인증)
export const deleteReply = async (commentId: number) => {
  const res = await authInstance.post(`/posts/${commentId}/reply`);
  return res.data;
};

// 9. 포스트 진입시 댓글목록 조회
export const getComments = async (postId: string) => {
  const res = await baseInstance.get(`/posts/${postId}/comments`);
  return res.data;
};

// 10. 댓글 하단 더보기 클릭시 답글목록 조회
export const getReply = async (commentId: number) => {
  const res = await baseInstance.get(`/posts/${commentId}/reply`);
  return res.data;
};

// 11. 로그인한 유저가 팔로잉 중인 유저의 게시물들 조회
export const getFollowingPosts = async () => {
  const res = await authInstance.get('/posts');
  return res.data;
};

//12. 게시글 상세 내부 좋아요 및 댓글 개수 확인
export const getSocialCounts = async (postId: string) => {
  const res = await baseInstance.get(`/posts/${postId}/counts`);
  return res.data;
};

//13. 메인 페이지 인기 브랜드 순위 랭킹 조회
export const getRanking = async () => {
  const res = await authInstance.get(`/popular`);
  return res.data;
};

// Post 등록
export const setPostRegist = async (postInfo: TodayPostTypes) => {
  try {
    const data = postInfo;
    await baseInstance.post('/posts/register', data);
  } catch (error) {
    console.log('Failed to regist post', error);
  }
};

// TodayCoffeeInfo
export const getTodayCoffeeInfo = async () => {
  try {
    const res = await authInstance.get('/coffee');
    await useSetCacheData('user', '/coffee', res.data[0]);
    return res.data[0];
  } catch (error) {
    console.log('Failed to get Today coffee Info', error);
  }
};
