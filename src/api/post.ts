import { Collections, TodayPostTypes } from '@/types/types';
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { getUserDocRef } from '@/api/user';

// getSubCollection
export const getSubCollecton = async (SubCollection: string) => {
  const userDocRef = await getUserDocRef();
  return collection(userDocRef, SubCollection);
};

// Post 등록
export const setPostRegist = async (postInfo: TodayPostTypes) => {
  const userDocRef = await getUserDocRef();
  const postCollection = await getSubCollecton(Collections.POSTS);
  await setDoc(doc(postCollection), {
    ...postInfo,
    timestamp: serverTimestamp()
  }).catch(error => console.log('Failed to regist post', error));

  const data = (await getDoc(userDocRef)).data();
  const caffeineData = data?.accumualted;
  await updateDoc(userDocRef, {
    accumualted: caffeineData + postInfo.caffeine
  });
};

export const getTodayCoffeeInfo = async () => {
  const postCollection = await getSubCollecton(Collections.POSTS);
  const dataList: DocumentData[] = [];
  const data = (await getDocs(postCollection)).docs;
  data.map(item => dataList.push(item.data()));
  return dataList;
};
