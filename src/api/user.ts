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
  DocumentData,
  collection,
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import { baseInstance } from '@/api/axiosInterceptor';
import { app } from '@/firebase.config';
import axios, { AxiosError } from 'axios';
import { AuthTypes, CachedData, Collections, UserTypes } from '@/types/types';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';

export const getSocialAuth = async (social: string) => {
  try {
    const res = await baseInstance.get(`users/signIn?social=${social}`);
    console.log('hi:', res.data);
    window.location.href = res.data;

    return res.data;
  } catch (error) {
    console.error('Error fetching social authentication:', error);
    return undefined;
  }
};

export const getsocialAccessToken = async (code: string | null) => {
  try {
    const res = await baseInstance.get(`/users/google/redirect?code=${code}`);
  } catch (error) {
    console.error('Error fetching social authentication:', error);
    return undefined;
  }
};

// Auth
export const auth = getAuth(app);

// UserDocRef
export const getUserDocRef = async () => {
  const userId = (await getUserId()) as string;
  return doc(getFirestore(), Collections.USERS, userId);
};

// 소셜로그인
export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  return await signInWithPopup(auth, googleProvider);
};

// 로그아웃
export const signOutAuth = async () => {
  await signOut(auth);
};

// 소셜 로그인후 uid 가져오는 함수
export const getUserId = async () => {
  try {
    const userId: CachedData = await useGetCacheData('user', '/userId');
    return userId.cacheData;
  } catch (error) {
    console.log('Failed to load userID');
    return undefined;
  }
};

//  userInfo를 cache storage에 caching 하는 함수
export const cacheUserInfo = async (data: DocumentData) => {
  await useSetCacheData('user', '/user', data);
  await useSetCacheData('userInfo', '/user', data);
};

// User 정보 가져오는 함수
export const getUserInfo = async () => {
  const userDocRef = await getUserDocRef();
  onSnapshot(userDocRef, doc => {
    if (doc.exists()) {
      const data = doc.data();
      console.log(data);
      data && cacheUserInfo(data);
    }
  });
  const data = (await getDoc(userDocRef)).data();
  return data;
};

// 프로필 설정 후 DB저장
export const setInitialInfo = async (userInfo: AuthTypes) => {
  const userDocRef = await getUserDocRef();
  try {
    await setDoc(userDocRef, { ...userInfo }, { merge: true });
    await getUserInfo();
  } catch (error) {
    console.log('Failed to save user initial info on DB', error);
  }
};

// 닉네임 중복 체크
export const getNicknameList = async () => {
  const fieldValues: UserTypes[] = [];
  const nicknameList: string[] = [];
  const userListDocRef = collection(getFirestore(), Collections.USERS);
  const data = await getDocs(userListDocRef);
  data &&
    data.forEach((doc: DocumentData) => {
      const fieldValue = doc.data()['user'];
      fieldValue && fieldValues.push(fieldValue);
    });
  fieldValues.map(
    (item: UserTypes) => item.nickname && nicknameList.push(item.nickname)
  );
  return nicknameList;
};
