import { useRef, useState } from 'react';
import { CropperRef } from 'react-mobile-cropper';

export const useImageCropper = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<CropperRef>();
  const [cropperEnabled, setCropperEnabled] = useState(false);

  //url state => for preview, file state => to upload to cloud storage
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<File>();

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
