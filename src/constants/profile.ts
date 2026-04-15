export const PROFILE_TEXTS = {
  anonymous: {
    title: '게스트 모드입니다.',
    text: `로그인하면 나의 피드를 확인 할 수 있어요. 
    오늘 마신 커피를 기록하고 관리해보세요.`,
    actionText: '로그인'
  },
  user: {
    my: {
      text: `아직 등록된 게시물이 없어요.`,
      actionText: '게시물 등록하기'
    },
    another: {
      text: `피드에 올린 게시물이 없어요.`,
      actionText: '피드 둘러보기',
      private: `비공개 계정입니다.
서로 팔로우하고 게시물을 공유해보세요.`
    }
  },
  profile: '프로필',
  profileTabs: ['사진', '전체'],
  nonMemberId: 'nonMember',
  followCount: ['게시물', '팔로워', '팔로잉'],
  privatePost: '나만보기'
};

export const MYPAGE_TEXTS = {
  btn: ['로그아웃', '회원탈퇴'],
  signOutUrls: [
    '/userInfo',
    '/userId',
    '/accessToken',
    '/coffee',
    '/social',
    '/socialToken'
  ],
  description:
    '비공개로 설정할 경우, 팔로워만 내 게시물, 팔로워 및 팔로잉 리스트를 볼 수 있습니다. 프로필 이미지, 닉네임, 소개글, 선호 브랜드, 누적 카페인 등 특정 정보는 모든 사람들에게 공개됩니다.'
};
