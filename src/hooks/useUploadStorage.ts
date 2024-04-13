import { getPresignedUrl } from '@/api/r2';
import { registerImage } from '@/api/post';

export const useUploadStorage = () => {
  const uploadStorage = async (route: string, file: File) => {
    const { url } = await getPresignedUrl(route);
    file && url && (await registerImage(url, file));
  };
  return uploadStorage;
};
