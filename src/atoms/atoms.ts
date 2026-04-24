import { atom, selector } from 'recoil';
import dayjs from 'dayjs';
import {
  AuthTypes,
  CaffeineFilterTypes,
  CaffeineIntakeTypes,
  PostContentsTypes
} from '@/types/types';
import { BRANDS } from '@/constants/coffee';

export const activeState = atom({
  key: 'activeState',
  default: 'home'
});

export const registerBtnActiveState = atom({
  key: 'registerBtnActiveState',
  default: false
});

export const headerLeftState = atom({
  key: 'headerLeftState',
  default: ''
});

export const headerTextState = atom({
  key: 'headerTextState',
  default: ''
});
export const headerRightState = atom({
  key: 'headerRightState',
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

export const isActionModalState = atom({
  key: 'isActionModal',
  default: false
});

export const authState = atom<AuthTypes>({
  key: 'authState',
  default: {
    nickname: '',
    brand: '',
    profileUrl: '',
    aboutMe: '',
    visibility: 1
  }
});

export const userInfoState = atom<AuthTypes>({
  key: 'userInfoState',
  default: {
    nickname: '',
    brand: '',
    sum: 0,
    profileUrl: '',
    userId: '',
    visibility: 1
  }
});

export const registPostState = selector<
  PostContentsTypes & CaffeineIntakeTypes
>({
  key: 'registPostState',
  get: ({ get }) => {
    const postContents = get(postContentsState);
    const caffeineIntake = get(caffeineIntakeState);
    const postData = {
      postId: postContents.postId,
      description: postContents.description,
      photo: postContents.photo,
      visibility: postContents.visibility,
      caffeine: caffeineIntake.caffeine,
      brand: caffeineIntake.brand,
      productName: caffeineIntake.productName,
      size: caffeineIntake.size,
      intensity: caffeineIntake.intensity,
      shot: caffeineIntake.shot
    };
    return postData;
  },
  set: ({ set }, newValue) => {
    if (newValue) {
      if ('postId' in newValue) set(postContentsState, newValue);
      if ('caffeine' in newValue) set(caffeineIntakeState, newValue);
    }
  }
});

export const postContentsState = atom<PostContentsTypes>({
  key: 'postContentsState',
  default: {
    postId: '',
    description: '',
    photo: '',
    visibility: 1
  }
});

export const caffeineIntakeState = atom<CaffeineIntakeTypes>({
  key: 'caffeineIntakeState',
  default: {
    caffeine: 0,
    brand: '',
    productName: '',
    size: 'Tall',
    intensity: '기본',
    shot: 0
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

export const toggleState = atom({
  key: 'toggleState',
  default: true
});

export const deleteCommentState = atom({
  key: 'deleteCommentState',
  default: {
    postId: '',
    commentId: 0
  }
});

export const deleteReplyState = atom({
  key: 'deleteReplyState',
  default: {
    postId: '',
    commentId: 0,
    replyId: 0
  }
});
