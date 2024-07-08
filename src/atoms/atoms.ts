import { atom } from 'recoil';
import dayjs from 'dayjs';
import {
  AuthTypes,
  CoffeeItemTypes,
  RegisterPostTypes,
  CaffeineFilterTypes
} from '@/types/types';
import { BRANDS } from '@/constants/coffee';

export const activeState = atom({
  key: 'activeState',
  default: 'home'
});

export const headerLogoState = atom({
  key: 'headerLogoState',
  default: false
});

export const headerTextState = atom({
  key: 'headerTextState',
  default: ''
});
export const headerIconsState = atom({
  key: 'headerIconsState',
  default: ''
});
export const footerShowState = atom({
  key: 'footerShowState',
  default: true
});
export const isModalState = atom({
  key: 'isModalState',
  default: false
});

export const authState = atom<AuthTypes>({
  key: 'authState',
  default: {
    nickname: '',
    brand: '',
    profileUrl: '',
    aboutMe: ''
  }
});

export const userInfoState = atom<AuthTypes>({
  key: 'userInfoState',
  default: {
    nickname: '',
    brand: '',
    sum: 0,
    profileUrl: '',
    userId: ''
  }
});

export const selectedMenuInfoState = atom<CoffeeItemTypes>({
  key: 'selectedMenuInfo',
  default: {
    brand: '',
    menu: '',
    caffeine: 0
  }
});
export const registerPostTitleState = atom({
  key: 'registerPostTitleState',
  default: false
});
export const registPostState = atom<RegisterPostTypes>({
  key: 'registPostState',
  default: {
    brand: '',
    menu: '',
    size: 'Regular',
    shot: 0,
    concentration: '기본',
    caffeine: 0,
    post_title: '',
    description: '',
    photo: '',
    postId: ''
  }
});

export const caffeineFilterState = atom<CaffeineFilterTypes>({
  key: 'caffeineFilterState',
  default: { caffeine: 0, menuCaffeine: 0 }
});

export const takedWaterState = atom({ key: 'takedWaterState', default: 0 });

export const inputNicknameAlertState = atom({
  key: 'inputNicknameAlertState',
  default: false
});

export const CheckNicknameState = atom<boolean | null>({
  key: 'CheckNicknameState',
  default: null
});

export const useInputState = atom({
  key: 'useInputState',
  default: ''
});

export const imageState = atom({
  key: 'imageState',
  default: ''
});

export const userIdState = atom({
  key: 'userIdState',
  default: localStorage.getItem('userId') || null
});

export const replyState = atom({
  key: 'replyState',
  default: {
    nickname: '',
    id: 0
  }
});

export const brandState = atom({
  key: 'brandState',
  default: BRANDS[0]
});

export const activeMonthState = atom({
  key: 'activeMonthState',
  default: dayjs(new Date()).format('YYYY-MM-DD')
});

export const cahceImgState = atom({
  key: 'cahceImgState',
  default: true
});

export const commentState = atom({
  key: 'commentState',
  default: {
    comment: true,
    commentId: 0
  }
});
