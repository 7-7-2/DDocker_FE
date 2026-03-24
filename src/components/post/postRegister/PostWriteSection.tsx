import { Dispatch, SetStateAction, useState } from 'react';

import ImgCropper from '@/components/common/ImgCropper';
import ImgRegister from '@/components/common/ImgRegister';
import PostInputDescription from '@/components/post/postRegister/PostInputDescription';
import RegisterLabel from '@/components/post/postRegister/RegisterLabel';
import Toggle from '@/components/common/Toggle';

import { LABEL_TEXTS } from '@/constants/common';
import { ImageCropperProps, ImageRegisterProps } from '@/types/types';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between } from '@/styles/layout';

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
  const [isVisibility, setVisibility] = useState(true);
  const handlePrivateToggle = () => {
    setVisibility(!isVisibility);
  };
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
      <PostPrivateToggle className={cx(Between)}>
        <RegisterLabel label={LABEL_TEXTS.postPrivate} />
        <Toggle
          toggleState={isVisibility}
          onClick={handlePrivateToggle}
        />
      </PostPrivateToggle>
    </>
  );
};

const PostPrivateToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: Center;
`;

export default PostWriteSection;
