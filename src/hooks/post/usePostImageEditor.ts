import { useImageCropper } from '@/hooks/post/useImageCropper';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useCompressImage } from '@/hooks/useCompressImage';

export const usePostImageEditor = (registPhoto: string | null) => {
  const { uploadStorage } = useCloudStorage();
  const { compressImage, isLoading } = useCompressImage();
  const {
    imageUrl,
    setImageUrl,
    setImageFile,
    imageFile,
    setCropperEnabled,
    cropperEnabled
  } = useImageCropper(registPhoto || null);

  const registerProps = {
    setImageUrl,
    imageUrl,
    setCropperEnabled,
    isLoading
  };

  const cropperProps = {
    aspectRatio: 1,
    setImageFile,
    cropperEnabled,
    compressImage
  };

  return { imageUrl, imageFile, uploadStorage, registerProps, cropperProps };
};
