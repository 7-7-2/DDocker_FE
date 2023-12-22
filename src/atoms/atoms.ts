import { atom } from 'recoil';
import {
  AuthTypes,
  CoffeeItem,
  SimplifyUser,
  UserTypes,
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
    initialized: false,
    user: {
      userId: '',
      email: '',
      name: '',
      nickname: '',
      brand: '',
      gender: '',
      profileUrl: ''
    },
    signIn: false
  }
});

export const userInfoState = atom<UserTypes>({
  key: 'userInfoState',
  default: {
    userId: '',
    email: '',
    name: '',
    nickname: '',
    brand: '',
    gender: '',
    profileUrl: ''
  }
});

export const selectedMenuState = atom({
  key: 'selectedMenuState',
  default: ''
});

export const selectedMenuInfoState = atom<CoffeeItem>({
  key: 'selectedMenuInfo',
  default: {
    brand: '',
    name: '',
    caffeine: '0'
  }
});

export const registPostState = atom({
  key: 'registPostState',
  default: {
    brand: '',
    name: '',
    size: '',
    shot: 0,
    caffeine: ``,
    title: '',
    photo: ''
  }
});

export const caffeineFilterState = atom<caffeineFilterTypes>({
  key: 'caffeineFilterState',
  default: { caffeine: '', menuCaffeine: '' }
});

export const inputNicknameState = atom({
  key: 'inputNicknameState',
  default: ''
});

export const inputNicknameAlertState = atom({
  key: 'inputNicknameAlertState',
  default: false
});

export const useInputState = atom({
  key: 'useInputState',
  default: ''
});

export const caffeineInfoState = atom({
  key: 'caffeineInfoState',
  default: {
    brand: '',
    menu: '',
    size: '',
    shot: 0
  }
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
