import { atom } from 'recoil';
import { AuthTypes, SimplifyUser } from '@/types/types';

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
      gender: ''
    },
    signIn: false
  }
});

export const initialInfoState = atom({
  key: 'initialInfoState',
  default: {
    nickname: '',
    brand: '',
    gender: ''
  }
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
