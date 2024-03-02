import { atom } from 'recoil';
import {
  AuthTypes,
  CoffeeItem,
  SimplifyUser,
  TodayPostTypes,
  caffeineFilterTypes
} from '@/types/types';

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

export const authState = atom<AuthTypes>({
  key: 'authState',
  default: {
    nickname: '',
    brand: '',
    gender: '',
    profileUrl: ''
  }
});

export const userInfoState = atom<AuthTypes>({
  key: 'userInfoState',
  default: {
    nickname: '',
    brand: '',
    sum: 0,
    profileUrl: ''
  }
});

export const selectedMenuInfoState = atom<CoffeeItem>({
  key: 'selectedMenuInfo',
  default: {
    brand: '',
    menu: '',
    caffeine: 0
  }
});

export const registPostState = atom<TodayPostTypes>({
  key: 'registPostState',
  default: {
    brand: '',
    menu: '',
    size: 'Regular',
    shot: 0,
    caffeine: 0,
    post_title: '',
    photo: ''
  }
});

export const caffeineFilterState = atom<caffeineFilterTypes>({
  key: 'caffeineFilterState',
  default: { caffeine: 0, menuCaffeine: 0 }
});

export const takedWaterState = atom({ key: 'takedWaterState', default: 0 });

export const inputNicknameAlertState = atom({
  key: 'inputNicknameAlertState',
  default: false
});

export const useInputState = atom({
  key: 'useInputState',
  default: ''
});

export const searchKeywordState = atom<string>({
  key: 'searchKeywordState',
  default: ''
});

export const searchResultsState = atom<SimplifyUser[]>({
  key: 'searchResultsState',
  default: []
});

export const imageState = atom({
  key: 'imageState',
  default: ''
});

export const userIdState = atom({
  key: 'userIdState',
  default: localStorage.getItem('userId') || null
});
