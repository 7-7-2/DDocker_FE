export const HEADER_TEXTS = {
  start: '기본정보'
};

export const INPUT_TEXTS = {
  type: {
    nickname: {
      typeName: 'nickname',
      btnText: '중복확인',
      placeholder: '닉네임을 입력하세요.'
    },
    comment: {
      typeName: 'comment',
      placeholder: '댓글을 작성해보세요.'
    },
    title: { typeName: 'title', placeholder: '제목을 입력하세요.' },
    description: {
      typeName: 'title',
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
      approval: '사용가능한 닉네임입니다.',
      disapproval: '이미 존재하는 닉네임입니다.',
      validate: '닉네임은 특수문자와 공백을 포함 할 수 없습니다'
    }
  },

  title: '제목',
  description: '내용',
  photo: '사진',
  aboutMe: {
    label: '소개글'
  }
};

export const BUTTON_TEXTS = {
  start: '시작하기',
  register: '등록하기',
  mainRegister: '조회된 커피 등록하기',
  update: '수정하기',
  next: '다음으로',
  signIn1: '로그인',
  signIn2: '로그인하기',
  following: '팔로잉',
  follow2: '팔로우',
  follow1: '팔로우 하기',
  home: '홈으로 돌아가기',
  deleteAccount: '탈퇴하기'
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
    confirm: '정말 탈퇴하시겠습니까?',
    warning: `회원 탈퇴 시 
  누적 데이터가 모두 삭제됩니다`,
    subBtn: '이전화면으로 돌아가기'
  }
};

export const SCROLL_INDUCER_TEXTS = {
  text: '스크롤 해보세요.'
};
