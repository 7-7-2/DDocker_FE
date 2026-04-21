import {
  authInstance,
  baseInstance,
  storageInstance
} from '@/api/axiosInterceptor';
import useSetCacheData from '@/hooks/useSetCacheData';
import {
  RegisterPostTypes,
  CommentInput,
  Fetched,
  CaffeineIntakeTypes
} from '@/types/types';

// 1. 포스트 조회
export const getPostDetail = async (postId: string) => {
  const res = await baseInstance.get(`/posts/${postId}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

// 2. 게시글 이미지 클라우드 업로드
export const registerImage = async (url: string, Image: File) => {
  const res = await storageInstance(url)
    .put('', Image)
    .catch((e: Error) => {
      console.log(e);
    });
  return res && res.status;
};

// 3. 포스트 삭제(+JWT 인증)
export const deletePost = async (postId: string) => {
  const res = await authInstance.delete(`/posts/${postId}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

// 4. 포스트 수정(+JWT 인증)
export const updatePost = async (postId: string, postInfo: Object) => {
  const res = await authInstance
    .patch(`/posts/${postId}`, postInfo)
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 5. 댓글 작성(+JWT 인증)
export const writeComment = async (comment: CommentInput) => {
  const res = await authInstance
    .post(`/comments`, { postId: comment.parentId, content: comment.content })
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 6. 댓글 삭제(+JWT 인증)
export const deleteComment = async (postId: string, commentId: number) => {
  const res = await authInstance
    .delete(`/comments`, { data: { commentId: commentId, postId: postId } })
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 7. 답글 작성(+JWT 인증)
export const replyComment = async (comment: CommentInput) => {
  const res = await authInstance
    .post(`/comments/reply`, {
      postId: comment.postId,
      commentId: comment.parentId,
      content: comment.content
    })
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 8. 답글 삭제(+JWT 인증)
export const deleteReply = async (
  postId: string,
  replyId: number,
  parentCommentId: number
) => {
  const res = await authInstance
    .delete(`/comments/reply`, {
      data: { replyId: replyId, postId: postId, commentId: parentCommentId }
    })
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 9. 포스트 진입시 댓글목록 조회
export const getComments = async (postId: string) => {
  const res = await baseInstance.get(`/comments/post/${postId}`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

// 10. 댓글 하단 더보기 클릭시 답글목록 조회
export const getReply = async (commentId: number) => {
  const res = await baseInstance
    .get(`/comments/${commentId}/replies`)
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

// 11. 로그인한 유저가 팔로잉 중인 유저의 게시물들 조회
export const getFollowingPosts = async ({
  pageParam
}: {
  pageParam: string | null;
}) => {
  const res = await authInstance
    .get(`/posts/following?cursor=${pageParam}`)
    .catch(e => {
      console.log(e);
    });
  const data = res && res.data;
  return {
    data: data.data.posts,
    next: data.data.nextCursor
  } as Fetched;
};

//12. 게시글 상세 내부 좋아요 및 댓글 개수 확인
export const getSocialCounts = async (postId: string) => {
  const res = await baseInstance.get(`/posts/${postId}/counts`).catch(e => {
    console.log(e);
  });
  return res && res.data.data;
};

//13. 메인 페이지 인기 브랜드 순위 랭킹 조회
export const getRanking = async () => {
  const res = await authInstance.get(`/popular`).catch(e => {
    console.log(e);
  });
  return res && res.data;
};

//14. 게시글 이미지 클라우드 삭제
export const deleteImage = async (url: string) => {
  const res = await storageInstance(url)
    .delete('')
    .catch(e => {
      console.log(e);
    });
};

// 15. 포스트 등록
export const registerPost = async (postInfo: RegisterPostTypes) => {
  try {
    const res = await authInstance.post('/posts/register', postInfo);
    return res.data.data;
  } catch (error) {
    console.log('Failed to regist post', error);
  }
};

//16. 카페인 기록하기
export const registerCaffeineIntake = async (
  caffieneIntake: CaffeineIntakeTypes
) => {
  const { brand, ...rest } = caffieneIntake;
  const res = await authInstance
    .post('/caffeine/intake', { brandId: brand, ...rest })
    .catch(e => {
      console.log(e);
    });
  return res && res.data;
};

//17. 홈 화면 오늘의 섭취 커피 조회
export const getTodayCoffeeInfo = async () => {
  try {
    const res = await authInstance.get('/caffeine/today');
    return res.data.data;
  } catch (error) {
    console.log('Failed to get Today coffee Info', error);
  }
};

//18. 홈 화면 이번주 인기 커피 브랜드
export const getWeeklyPopular = async () => {
  try {
    const res = await baseInstance.get('/discovery/ranking');
    return res && res.data;
  } catch (error) {
    console.log('Failed to get Weekly Popular List', error);
  }
};

//19. 커피 메뉴 조회
export const getCoffeeMenu = async () => {
  try {
    const res = await baseInstance.get('/brand');
    res && (await useSetCacheData('brand', '/coffeeMenu', res.data.data));
    return res && res.data.data;
  } catch (error) {
    console.log('Failed to get coffee menu List', error);
  }
};

//20. 즐겨찾는 메뉴 등록
export const setFavoriteMenu = async (caffieneIntake: CaffeineIntakeTypes) => {
  await authInstance.post('/favorites', caffieneIntake).catch(e => {
    console.log(e);
    throw e;
  });
};

//20. 즐겨찾는 메뉴 조회
export const getFavoriteMenu = async () => {
  const res = await authInstance.get('/favorites').catch(e => {
    console.log(e);
  });
  return res && res.data.data;
};

// 21. 즐겨찾는 메뉴 삭제
export const deleteFavoriteMenu = async (id: number) => {
  const data = { id: id };
  const res = await authInstance
    .delete('/favorites', { data: data })
    .catch(e => {
      console.log(e);
    });
  return;
};
