import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  DocumentData
} from 'firebase/firestore';
import { app } from '@/firebase.config';
import { AuthTypes, Collections } from '@/types/types';

// Auth
export const auth = getAuth(app);

// UserDocRef
export const getUserDocRef = () => {
  const userId = getUserId() as string;
  return doc(getFirestore(), Collections.USERS, userId);
};

// 소셜로그인
export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  return await signInWithPopup(auth, googleProvider);
};

export const signOutAuth = async () => {
  await signOut(auth);
};

// 소셜 로그인후 uid 가져오는 함수
export const getUserId = () => {
  const userId = localStorage.getItem('userId') as string;
  return userId;
};

// 프로필 설정 후 DB저장
export const setInitialInfo = async (userInfo: AuthTypes) => {
  const userDocRef = getUserDocRef();
  await setDoc(userDocRef, { ...userInfo }, { merge: true });
};

// User 정보 가져오는 함수
export const getUserInfo = async () => {
  const userDocRef = getUserDocRef();
  const data = (await getDoc(userDocRef)).data();
  const saveUserInfo = (data: DocumentData) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  };
  {
    data && saveUserInfo(data);
  }
  return data;
};
