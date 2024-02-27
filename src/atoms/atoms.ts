import { atom } from 'recoil';
import { DocumentData } from 'firebase/firestore';
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

export const selectedBrandState = atom({
  key: 'selectedBrandState',
  default: ''
});

export const selectedMenuState = atom({
  key: 'selectedMenuState',
  default: ''
});

export const selectedMenuInfoState = atom<CoffeeItem>({
  key: 'selectedMenuInfo',
  default: {
    brand: '',
    menu: '',
    caffeine: ''
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

export const todayCoffeeListState = atom<DocumentData[]>({
  key: 'todayCoffeeListState',
  default: [
    {
      brand: '',
      name: '',
      size: 'Regular',
      shot: 0,
      caffeine: 0,
      title: '',
      photo: ''
    }
  ]
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

export const userIdState = atom({
  key: 'userIdState',
  default: localStorage.getItem('userId') || null
});
