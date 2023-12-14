import { atom } from 'recoil';
import { AuthTypes } from '@/types/types';

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
      name: ''
    },
    signIn: false
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
