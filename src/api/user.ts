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
  getDocs
} from 'firebase/firestore';
import { app } from '@/firebase.config';
import { AuthTypes, CachedData, Collections, UserTypes } from '@/types/types';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';

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

export const signOutAuth = async () => {
  await signOut(auth);
};

const getCacheUserId = async () => {
  const userId: CachedData = await useGetCacheData('user', '/userId');
  return userId.cacheData;
};

// 소셜 로그인후 uid 가져오는 함수
export const getUserId = async () => {
  const web = localStorage.getItem('userId');
  const userId = web
    ? (localStorage.getItem('userId') as string)
    : await getCacheUserId();
  return userId;
};

// User 정보 가져오는 함수
export const getUserInfo = async () => {
  const userDocRef = await getUserDocRef();
  const data = (await getDoc(userDocRef)).data();
  const saveUserInfo = (data: DocumentData) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  };
  const cacheUserInfo = async (data: DocumentData) => {
    await useSetCacheData('user', '/user', data);
  };
  {
    data && saveUserInfo(data);
    data && cacheUserInfo(data);
  }
  return data;
};

// 프로필 설정 후 DB저장
export const setInitialInfo = async (userInfo: AuthTypes) => {
  const userDocRef = await getUserDocRef();
  await setDoc(userDocRef, { ...userInfo }, { merge: true });
  await getUserInfo();
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
