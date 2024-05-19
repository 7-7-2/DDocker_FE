export const PROFILE_TEXTS = {
  anonymous: {
    title: '게스트 모드입니다.',
    text: `로그인하면 나의 피드를 확인 할 수 있어요. 
    오늘 마신 커피를 기록하고 관리해보세요.`,
    actionText: '로그인'
  },
  user: {
    my: {
      text: `아직 등록된 게시물이 없어요.
    오늘 마신 커피를 공유하고 기록해보세요.`,
      actionText: '홈으로'
    },
    another: `아직 등록된 게시물이 없어요.`
  },
  profile: '프로필'
};

export const MYPAGE_TEXTS = {
  btn: ['회원탈퇴', '로그아웃'],
  signOutUrls: ['/userInfo', '/userId', '/accessToken', '/coffee', '/social']
};
