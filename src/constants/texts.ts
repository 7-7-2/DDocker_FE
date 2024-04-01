import { TabsText } from '@/types/types';

export const TEXT = {
  exitButtonText: '회원 탈퇴',
  saveButton: '저장하기',
  addedcaffeine: '누적 카페인',
  mgLabel: 'mg',
  cancelBtn: '취소',
  deleteBtn: '삭제',
  toggleFollowedBtn: '팔로워',
  toggleFollowingBtn: '팔로잉',
  searchMore: '더보기'
};

export const COMMENT_TEXTS = {
  count: '개의 댓글',
  reply: '답글 달기',
  hide: '답글 숨기기',
  loadMore: '개의 답글 더보기',
  at: '@',
  onReply: '님의 댓글에 답글 작성 중'
};

export const TABS_TEXTS: TabsText = {
  trend: ['trend', '트렌드'],
  following: ['following', '팔로잉']
};

export const TREND_TEXTS = {
  daily: '오늘의 인기 게시글',
  popular: '의 인기 게시글',
  latest: '최신',
  popularity: '인기',
  divide: ' | ',
  WeeklyPopular: '이번 주 인기 메뉴는 ',
  is: '입니다!'
};

export const CTA_TEXTS = {
  trend: `아직 작성된 게시글이 없어요.
  게시글을 등록해보세요!
  `,
  trendAction: '등록하기',
  followDiscovery: `아직 팔로우한 사람이 없어요. 
  유저를 팔로우하고 피드를 확인해보세요.`,
  followDiscoveryAction: '검색하기',
  signIn: '로그인 후 피드를 확인해보세요.',
  signInAction: '로그인하기',
  emptyFollowing: '아직 팔로우한 사람이 없어요. ',
  emptyFollower: '아직 팔로워가 없어요.'
};

export const POST_TEXTS = {
  noComments: '아직 작성한 댓글이 없어요',
  delete: '이 게시물을 삭제하시겠습니까?'
};
