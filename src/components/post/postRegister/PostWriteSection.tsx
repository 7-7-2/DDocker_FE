import { RefObject } from 'react';

import ImgCropper from '@/components/common/ImgCropper';
import ImgRegister from '@/components/common/ImgRegister';
import PostInputDescription from '@/components/post/postRegister/PostInputDescription';
import PostInputTitle from '@/components/post/postRegister/PostInputTitle';
import RegisterLabel from '@/components/post/postRegister/RegisterLabel';

import { LABEL_TEXTS } from '@/constants/common';
import { ImageCropperProps, ImageRegisterProps } from '@/types/types';

const PostWriteSection = ({
  inputRef,
  textAreaRef,
  registerProps,
  cropperProps
}: {
  inputRef: RefObject<HTMLInputElement>;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  registerProps: ImageRegisterProps;
  cropperProps: ImageCropperProps;
}) => {
  return (
    <>
      <PostInputTitle inputRef={inputRef} />
      <PostInputDescription inputRef={textAreaRef} />
      <RegisterLabel
        label={LABEL_TEXTS.photo}
        essential
      />
      <ImgRegister {...registerProps} />
      <ImgCropper
        {...registerProps}
        {...cropperProps}
      />
    </>
  );
};

export default PostWriteSection;
