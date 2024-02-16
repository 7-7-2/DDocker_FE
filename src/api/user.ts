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
import { authInstance, baseInstance } from '@/api/axiosInterceptor';
import { AuthTypes, CachedData, Collections, UserTypes } from '@/types/types';
import useGetCacheData from '@/hooks/useGetCacheData';
import useSetCacheData from '@/hooks/useSetCacheData';

// Auth
export const getSocialAuth = async (social: string) => {
  try {
    const res = await baseInstance.get(`users/signIn?social=${social}`);
    // redirect url
    window.location.href = res.data.url;
    await useSetCacheData('user', '/social', res.data.social);
  } catch (error) {
    console.error('Error fetching social authentication:', error);
  }
};

//
export const getAccessToken = async (code: string | null, social: string) => {
  try {
    const res = await baseInstance.get(
      `/users/${social}/redirect?code=${code}`
    );
    await useSetCacheData('user', '/accessToken', res.data.accessToken);
    return res.data.accessToken;
  } catch (error) {
    console.error('Error fetching social authentication:', error);
  }
};

// User 정보 가져오는 함수
export const getUserInfo = async () => {
  try {
    const res = await authInstance.get(`/users/0/userInfo`);
    await useSetCacheData('user', '/userInfo', res.data);
  } catch (error) {
    console.log('Error fetching social authentication:', error);
  }
};

// 초기 프로필 설정
export const setUserInitInfo = async (userInfo: AuthTypes) => {
  try {
    const data = userInfo;
    const res = await authInstance.post('/users', data);
    console.log(res, data);
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

// UserDocRef
export const getUserDocRef = async () => {
  const userId = (await getUserId()) as string;
  return doc(getFirestore(), Collections.USERS, userId);
};
