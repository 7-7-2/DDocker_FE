import { useState } from 'react';
import imageCompression from 'browser-image-compression';

const options = {
  maxSizeMB: 0.5
};

export const useCompressImage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const compressImage = async (imageFile: File) => {
    if (isLoading) return;
    setIsLoading(true);

    const compressedFile = await imageCompression(imageFile, options).catch(
      e => {
        setIsLoading(false);
        console.log(e);
      }
    );

    setIsLoading(false);

    return compressedFile && compressedFile;
  };

  return { compressImage, isLoading };
};
