import { authInstance, baseInstance } from '@/api/axiosInterceptor';
import useSetCacheData from '@/hooks/useSetCacheData';
import { RegisterPostTypes, CommentInput } from '@/types/types';

interface PostForm {}

// 1. 포스트 조회
export const getPostDetail = async (postId: string) => {
  const res = await baseInstance.get(`/posts/${postId}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

// 2. 포스트 등록(+JWT 인증)
export const registerPost = async (postForm: PostForm) => {
  const res = await authInstance.post(`/posts/register`, postForm).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

// 3. 포스트 삭제(+JWT 인증)
export const deletePost = async (postId: string) => {
  const res = await authInstance.delete(`/posts/${postId}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

// 4. 포스트 수정(+JWT 인증)
export const updatePost = async (
  postId: string,
  postForm: Partial<PostForm>
) => {
  const res = await authInstance
    .patch(`/posts/${postId}`, postForm)
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 5. 댓글 작성(+JWT 인증)
export const writeComment = async (comment: CommentInput) => {
  const res = await authInstance
    .post(`/posts/${comment.parentId}/comments`, { content: comment.content })
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 6. 댓글 삭제(+JWT 인증)
export const deleteComment = async (postId: string, commentId: number) => {
  const res = await authInstance
    .delete(`/posts/${postId}/comments/${commentId}`)
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 7. 답글 작성(+JWT 인증)
export const replyComment = async (comment: CommentInput) => {
  const res = await authInstance
    .post(`/posts/${comment.parentId}/reply`, { content: comment.content })
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 8. 답글 삭제(+JWT 인증)
export const deleteReply = async (commentId: number) => {
  const res = await authInstance.post(`/posts/${commentId}/reply`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

// 9. 포스트 진입시 댓글목록 조회
export const getComments = async (postId: string) => {
  const res = await baseInstance.get(`/posts/${postId}/comments`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

// 10. 댓글 하단 더보기 클릭시 답글목록 조회
export const getReply = async (commentId: number) => {
  const res = await baseInstance.get(`/posts/${commentId}/reply`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

// 11. 로그인한 유저가 팔로잉 중인 유저의 게시물들 조회
export const getFollowingPosts = async ({
  pageParam
}: {
  pageParam: number;
}) => {
  const res = await authInstance
    .get(`/posts/following/${pageParam}`)
    .catch(e => {
      console.log(e);
    });
  const data = res && res.data;
  return {
    data: data.data.results,
    next: data.data.next
  };
};

//12. 게시글 상세 내부 좋아요 및 댓글 개수 확인
export const getSocialCounts = async (postId: string) => {
  const res = await baseInstance.get(`/posts/${postId}/counts`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

//13. 메인 페이지 인기 브랜드 순위 랭킹 조회
export const getRanking = async () => {
  const res = await authInstance.get(`/popular`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

// PostRegister
export const setPostRegist = async (postInfo: RegisterPostTypes) => {
  try {
    const data = postInfo;
    const res = await authInstance.post('/posts/register', data);
    return res.data.data;
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

// WeeklyPopular
export const getWeeklyPopular = async () => {
  try {
    const res = await baseInstance.get('/posts/popular');
    await useSetCacheData('brand', '/WeeklyPopular', res.data.data);
    return res.data.data;
  } catch (error) {
    console.log('Failed to get Weekly Popular List', error);
  }
};

// selectMenu
export const getCoffeeMenu = async () => {
  try {
    const res = await baseInstance.get('/brand');
    await useSetCacheData(
      'brand',
      '/coffeeMenu',
      res.data.data[0].coffee_menus
    );
    return res.data.data[0].coffee_menus;
  } catch (error) {
    console.log('Failed to get coffee menu List', error);
  }
};
