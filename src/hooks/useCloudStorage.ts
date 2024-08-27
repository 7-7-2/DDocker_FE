import {
  getPresignedUploadUrl,
  getPresignedDeleteUrl,
  deleteAllFolderItems
} from '@/api/r2';
import { registerImage, deleteImage } from '@/api/post';

export const useCloudStorage = () => {
  const uploadStorage = async (route: string, file: File) => {
    const { url } = await getPresignedUploadUrl(route);
    const res = await registerImage(file && url && url, file);
    return res as number;
  };

  const deleteStorage = async (route: string) => {
    const { url } = await getPresignedDeleteUrl(route);
    url && (await deleteImage(url));
  };

  const deleteFolder = async (route: string) => {
    await deleteAllFolderItems(route);
  };

  return { uploadStorage, deleteStorage, deleteFolder };
};
