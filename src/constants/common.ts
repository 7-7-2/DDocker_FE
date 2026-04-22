import { TabsText } from '@/types/types';

export const HEADER_TEXTS = {
  start: '기본정보',
  post: {
    postRegister: '새 게시물',
    caffeineRegister: '마신 커피 추가',
    update: '게시물 수정',
    post: '게시물',
    favorites: '즐겨찾는 메뉴'
  },
  profile: {
    MyProfile: 'MY PAGE'
  }
};

export const INPUT_TEXTS = {
  type: {
    nickname: {
      typeName: 'nickname',
      edit: 'nicknameEdit',
      btnText: '중복확인',
      placeholder: '닉네임을 입력하세요.'
    },
    comment: {
      typeName: 'comment',
      placeholder: '댓글을 작성해보세요.'
    },
    description: {
      typeName: 'post',
      placeholder: '내용을 입력하세요.',
      myCafe: '나만의 카페에 대한 정보를 공유해보세요.',
      inputLength: 200
    },
    search: { typeName: 'search', placeholder: '검색어를 입력해주세요.' },
    aboutMe: {
      typeName: 'aboutMe',
      placeholder: '소개 글을 적어주세요.',
      inputLength: 50
    }
  }
};

export const LABEL_TEXTS = {
  nickname: {
    label: '닉네임',
    message: {
      approval: '사용 가능한 닉네임이에요.',
      disapproval: '이미 존재하는 닉네임이에요.',
      Insufficien: '2자 이상 입력해주세요.',
      Invalid: '사용할 수 없는 닉네임이에요.'
    }
  },
  favBrand: '선호 브랜드',
  title: '제목',
  description: '내용',
  photo: '사진',
  postPrivate: '게시물 나만 보기',
  accountPrivate: '비공개 계정',
  aboutMe: {
    label: '소개'
  }
};

export const BUTTON_TEXTS = {
  type: 'retention',
  start: '시작하기',
  registered: '등록 완료',
  registered2: '작성 완료',
  register: '등록하기',
  mainRegister: '조회한 커피 등록하기',
  coffeeRegister: '빠르게 기록하기',
  postRegister: '게시물 공유하기',
  update: '수정완료',
  update2: '수정하기',
  next: '다음으로',
  signIn1: '로그인',
  signIn2: '로그인하기',
  following: '팔로잉',
  follow2: '팔로우',
  follow1: '팔로우 하기',
  home: '홈으로 돌아가기',
  post: '게시물로 이동하기',
  deleteAccount: '탈퇴하기',
  notNow: '안할래요',
  favoriteMenu: '+ 즐겨찾기 추가',
  confirm: '확인',
  cancel: '취소',
  delete: '삭제',
  delete2: '삭제하기',
  imgDelete: '이미지 삭제',
  save: '저장하기',
  viewAll: '전체보기',
  profileShare: '이 프로필 공유하기',
  userReport: '사용자 신고하기',
  continue: '계속하기',
  quit: '나가기',
  close: '닫기',
  edit: '편집하기'
};

export const TABS_TEXTS: TabsText = {
  trend: ['trend', '트렌드'],
  following: ['following', '팔로잉']
};

export const FILL_TABS_TEXTS = {
  register: ['전체메뉴', '즐겨찾는 메뉴']
};

export const MODAL_CTA_TEXTS = {
  signIn: {
    text: `로그인 후
  자세한 내용을 확인해보세요.`,
    register: `로그인 후 
  커피 정보를 등록해보세요.`,
    subBtn: `로그인 없이 둘러보기`
  },
  deleteAccount: {
    confirm: '정말 탈퇴하시겠어요?',
    warning: `커피 기록, 카페인 섭취량, 분석, 게시물 등
모든 개인 기록이 삭제되며 복구할 수 없습니다.`
  },
  register: {
    title: {
      caffeineIntake: '커피 등록을 그만두시겠어요?',
      post: '게시물 작성을 그만두시겠어요?'
    },
    description: '작성 중인 내용이 삭제됩니다.'
  }
};

export const SCROLL_INDUCER_TEXTS = {
  text: '스크롤 해보세요.'
};

export const CAFFEINE_TEXTS = {
  recommendedCaffeine: 400,
  unit: 'mg'
};

export const TOAST_TEXT = {
  style: {
    id: 'toast',
    duration: 2000,
    position: 'bottom-center',
    icon: null,
    style: {
      borderRadius: '50px',
      backgroundColor: 'var(--colors-main-dark)',
      color: '#fff',
      fontSize: 'var(--font-sizes-sm)',
      fontWeight: '500',
      height: '42px',
      padding: '10px 20px',
      marginBottom: '94px'
    }
  } as const,
  text: {
    nickname: '닉네임 중복확인을 해주세요.',
    unavailable: '닉네임 설정을 완료해주세요.',
    favMenu: {
      sucess: '즐겨찾는 메뉴로 추가되었어요.',
      error: '이미 즐겨찾기에 추가된 메뉴예요'
    },
    clipboard: {
      success: '링크가 복사되었습니다!',
      error: '링크 복사에 실패했습니다.'
    }
  }
};
