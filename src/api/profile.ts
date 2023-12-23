import { doc, getFirestore, updateDoc, DocumentReference } from 'firebase/firestore'
import { ref, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage';
import { app } from '@/firebase.config';
import { CachedData, Collections } from '@/types/types';
import useGetCacheData from '@/hooks/useGetCacheData';

export const storage = getStorage(app);

// userId 를 가져오는 함수
const getUserId = async () => {
    const userId: CachedData = await useGetCacheData('user', '/userId');
    return userId.cacheData;
  };

// 생성된 문서를 가져오는 함수
export const getUserDocRef = async (): Promise<DocumentReference> => {
  const userId = (await getUserId()) as string;
  return doc(getFirestore(), Collections.USERS, userId);
};

// // profileUrl 을 실시간으로 업데이트 하는 함수
// export const setProfileImg = async (profileUrl: UserTypes) => {
//     const userDocRef = await getUserDocRef();
    
//     const updateDB = onSnapshot(userDocRef, (snapshot: DocumentSnapshot) => {
//         const userData = snapshot.data();
//         const selectedDoc = userData?.user?.profileUrl as string | undefined;
//         if (selectedDoc) {
//             profileUrl.profileUrl = selectedDoc
//           }
//   }) 
//   return {updateDB}
// } 

// storage 에 이미지를 업로드 하는 함수
export const setStorageImg = async (path: string, file: File) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
  };

// storage 에 저장된 이미지를 다운로드 하는 함수
export const getStorageImg = async (path: string): Promise<string | null> => {
    const storageRef = ref(storage, path);
  try {
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("다운로드 실패:", error);
    return null;
  }
};

// 생성된 문서에 다운로드 받은 이미지를 업데이트(수정, 추가) 하는 함수
export const setProfileImg = async (getUserDocRef: DocumentReference, filePath: string): Promise<void> => {
    const downloadURL = await getStorageImg(filePath)
    if (downloadURL) {
        await updateDoc(getUserDocRef, {
            'user.profileUrl': downloadURL
        })    
    }
    
}