import { useImageCropper } from '@/hooks/post/useImageCropper';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useCompressImage } from '@/hooks/useCompressImage';
import { useEffect, useState } from 'react';
const imagePath = import.meta.env.VITE_R2_USER_IMAGE_PATH;
export const useEditProfileImg = () => {
  const { userId } = useCachedUserInfo();
  const [isDeleted, setIsDeleted] = useState(false);
  const { compressImage, isLoading } = useCompressImage();
  const { uploadStorage, deleteStorage } = useCloudStorage();
  const storagePath = `${imagePath}%2F${userId}`;

  const {
    imageUrl,
    setImageUrl,
    setImageFile,
    imageFile,
    setCropperEnabled,
    cropperEnabled
  } = useImageCropper();

  const cropperProps = {
    setImageFile,
    cropperEnabled,
    compressImage,
    isLoading
  };

  const editProps = {
    imageUrl,
    setImageUrl,
    setCropperEnabled
  };

  const handleDeleteImg = () => {
    setImageUrl('');
    setIsDeleted(true);
  };

  const handleProfileImg = async () => {
    if (isDeleted) {
      await deleteStorage('user', userId, '');
      return null;
    }
    const uploaded =
      imageFile && (await uploadStorage('user', userId, '', imageFile));
    return uploaded;
  };

  useEffect(() => {
    imageUrl && setIsDeleted(false);
  }, [imageUrl]);

  return {
    cropperProps,
    editProps,
    storagePath,
    isDeleted,
    handleDeleteImg,
    handleProfileImg
  };
};
