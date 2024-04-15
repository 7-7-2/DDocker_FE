import { getPresignedUploadUrl, getPresignedDeleteUrl, r2 } from '@/api/r2';
import { registerImage, deleteImage } from '@/api/post';

export const useCloudStorage = () => {
  const uploadStorage = async (route: string, file: File) => {
    const { url } = await getPresignedUploadUrl(r2, route);
    file && url && (await registerImage(url, file));
  };

  const deleteStorage = async (route: string) => {
    const { url } = await getPresignedDeleteUrl(r2, route);
    url && (await deleteImage(url));
  };

  return { uploadStorage, deleteStorage };
};
