import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase.config';

export const useStorage = () => {
  const uploadFile = async (path: string, file: File) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
  };

  return { uploadFile };
};