import { getPresignedUploadUrl, getPresignedDeleteUrl, r2 } from '@/api/r2';
import { registerImage, deleteImage } from '@/api/post';

export const useCloudStorage = () => {
  const uploadStorage = async (route: string, file: File) => {
    const { url } = await getPresignedUploadUrl(r2, route);
    const res = await registerImage(file && url && url, file);
    return res as number;
  };

  const deleteStorage = async (route: string) => {
    const { url } = await getPresignedDeleteUrl(r2, route);
    url && (await deleteImage(url));
  };

  return { uploadStorage, deleteStorage };
};
