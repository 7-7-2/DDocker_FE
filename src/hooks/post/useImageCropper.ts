import { useEffect, useRef, useState } from 'react';
import { CropperRef } from 'react-mobile-cropper';

export const useImageCropper = (updateImageUrl?: string | null) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<CropperRef>();
  const [cropperEnabled, setCropperEnabled] = useState(false);

  //url state => for preview, file state => to upload to cloud storage
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    updateImageUrl && setImageUrl(updateImageUrl);
  }, [updateImageUrl]);

  return {
    fileInputRef,
    cropperRef,
    cropperEnabled,
    setCropperEnabled,
    imageUrl,
    setImageUrl,
    imageFile,
    setImageFile
  };
};
