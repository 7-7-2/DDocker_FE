import {
  getPresignedUploadUrl,
  getPresignedDeleteUrl,
  deleteAllFolderItems
} from '@/api/r2';
import { registerImage, deleteImage } from '@/api/post';

export const useCloudStorage = () => {
  const uploadStorage = async (
    dir: string,
    userId: string,
    postId: string = '',
    file: File
  ) => {
    const { url } = await getPresignedUploadUrl(dir, userId, postId);
    const res = await registerImage(file && url && url, file);
    return res as number;
  };

  const deleteStorage = async (
    dir: string,
    userId: string,
    postId: string = ''
  ) => {
    const { url } = await getPresignedDeleteUrl(dir, userId, postId);
    url && (await deleteImage(url));
  };

  const deleteFolder = async (dir: string, userId: string) => {
    await deleteAllFolderItems(dir, userId);
  };

  return { uploadStorage, deleteStorage, deleteFolder };
};
