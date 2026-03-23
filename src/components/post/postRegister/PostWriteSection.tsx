import { Dispatch, SetStateAction } from 'react';

import ImgCropper from '@/components/common/ImgCropper';
import ImgRegister from '@/components/common/ImgRegister';
import PostInputDescription from '@/components/post/postRegister/PostInputDescription';
import RegisterLabel from '@/components/post/postRegister/RegisterLabel';

import { LABEL_TEXTS } from '@/constants/common';
import { ImageCropperProps, ImageRegisterProps } from '@/types/types';

const PostWriteSection = ({
  descriptions,
  setDescriptions,
  registerProps,
  cropperProps
}: {
  descriptions: string | null;
  setDescriptions: Dispatch<SetStateAction<string | null>>;
  registerProps: ImageRegisterProps;
  cropperProps: ImageCropperProps;
}) => {
  return (
    <>
      <PostInputDescription
        descriptions={descriptions}
        setDescriptions={setDescriptions}
      />
      <RegisterLabel label={LABEL_TEXTS.photo} />
      <ImgRegister {...registerProps} />
      <ImgCropper
        {...registerProps}
        {...cropperProps}
      />
    </>
  );
};

export default PostWriteSection;
