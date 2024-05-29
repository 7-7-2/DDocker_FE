import { ROUTES } from '@/constants/routes';

const SEO_DATA = {
  start: {
    title: '로그인',
    pageUrl: ROUTES[0],
    description: '소셜로그인을 통해 DDocker 서비스를 쉽게 경험해보세요.'
  },
  signUp: {
    title: '회원가입',
    pageUrl: ROUTES[0],
    description:
      'DDocker 서비스에 가입하고 건강하고 즐거운 똑똑한 커피 생활을 시작해보세요.'
  },
  home: {
    title: '또커, 똑똑한 커피 생활',
    pageUrl: '',
    description: '모임, 일상, 취미가 된 커피를 건강하고 똑똑하게 즐겨보세요.'
  },
  follow: {
    title: '팔로워',
    pageUrl: ROUTES[2],
    description: '나를 팔로우하는 또커들을 확인하고 방문해보세요.'
  },
  following: {
    title: '팔로잉',
    pageUrl: ROUTES[2],
    description: '내가 팔로우하는 또커들의 프로필을 확인하고 방문해보세요.'
  },
  myPage: {
    title: '프로필 수정',
    pageUrl: ROUTES[3],
    description:
      '또커 계정의 프로필을 변경해보세요. 닉네임 변경, 프로필 사진 업로드, 한 줄 소개 등을 통해 나만의 프로필을 만들 수 있습니다.'
  },
  notification: {
    title: '알림',
    pageUrl: ROUTES[4],
    description: '또커 계정의 새로운 팔로우, 댓글, 종아요를 확인해보세요.'
  },
  post: {
    title: '게시물',
    pageUrl: ROUTES[5],
    description:
      '또커 게시물의 브랜드, 메뉴, 카페인을 확인하고 좋아요, 댓글을 통해 소통해보세요. 또커의 커피 사진과 게시글을 공유하기 버튼을 통해 공유해보세요.'
  },
  register: {
    title: '게시물 등록',
    pageUrl: `${ROUTES[5]}/register`,
    description:
      '또커 게시물을 등록해보세요. 브랜드, 메뉴, 샷 이나 사이즈 등의 추가정보를 입력해 보다 더 정확하게 내가 마신 카페인을 기록 할 수 있습니다.'
  },
  update: {
    title: '게시물 수정',
    pageUrl: ROUTES[5],
    description:
      '또커 게시물의 정보를 잘못 입력하거나 수정하고 싶을 때 언제든지 게시물 정보를 변경 할 수 있습니다.'
  },
  postsTrend: {
    title: '트렌드 피드',
    pageUrl: ROUTES[6],
    description:
      '지금 가장 인기있는 게시물과 브랜드별 최신 게시물 및 인기 게시물들을 확인하고 좋아요와 댓글을 남겨보세요'
  },
  postsFollowing: {
    title: '팔로잉 피드',
    pageUrl: ROUTES[6],
    description:
      '내가 팔로잉 하는 또커 유저들의 촤신 게시물들을 확인하고 좋아요와 댓글을 남겨보세요.'
  },
  search: {
    title: '검색',
    pageUrl: ROUTES[7],
    description:
      '검색을 통해 다른 또커 유저를 검색헤보세요. 또커 유저의 프로필에 방문해 게시물, 팔로우, 팔로잉 목록을 살펴 볼 수 있습니다.'
  },
  profile: {
    title: '프로필',
    pageUrl: ROUTES[8],
    description: '또커의 프로필을 확인하고 게시물을 둘러보세요'
  },
  coffee: {
    title: '나의 커피',
    pageUrl: ROUTES[9],
    description:
      '나의 커피 페이지를 확인해보세요. 내가 마신 커피 섭취량을 주, 월, 년 별로 확인하고, 카페인 달력을 통해 적정량을 섭취하고 있는지 한번에 확인 할 수 있습니다.'
  },
  support: {
    title: '고객센터',
    pageUrl: `${ROUTES[10]}/customerCenter`,
    description: 'DDocker의 공지사항과 자주 묻는 질문을 확인하세요.'
  },
  supportNotice: {
    title: '공지사항',
    pageUrl: `${ROUTES[10]}/notice`,
    description: 'DDocker의 공지사항을 확인하세요.'
  },
  supportTOS: {
    title: '이용약관',
    pageUrl: `${ROUTES[10]}/TOS`,
    description: 'DDocker의 이용약관을 확인하세요.'
  },
  supportPrivacyPolicy: {
    title: '개인정보처리방침',
    pageUrl: `${ROUTES[10]}/privacyPolicy`,
    description: 'DDocker의 개인정보처리방침을 확인하세요.'
  },
  report: {
    title: '신고하기',
    pageUrl: ROUTES[11],
    description:
      '신고 내용을 제출해주세요. 또커 팀이 최대한 빠르게 검토하여 대응하겠습니다.'
  }
};
export default SEO_DATA;
