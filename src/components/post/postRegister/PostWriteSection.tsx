import { Dispatch, SetStateAction, useState } from 'react';
import { useRecoilState } from 'recoil';

import ImgCropper from '@/components/common/ImgCropper';
import ImgRegister from '@/components/common/ImgRegister';
import PostInputDescription from '@/components/post/postRegister/PostInputDescription';
import RegisterLabel from '@/components/post/postRegister/RegisterLabel';
import Toggle from '@/components/common/Toggle';

import { postContentsState } from '@/atoms/atoms';
import { ImageCropperProps, ImageRegisterProps } from '@/types/types';
import { LABEL_TEXTS } from '@/constants/common';

import { styled } from 'styled-system/jsx';
import { Between, Column } from '@/styles/layout';
import { RegisterContentsStyle } from '@/styles/styles';

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
  const [isVisibility, setVisibility] = useState(false);
  const [postContents, setPostcontents] = useRecoilState(postContentsState);

  const handlePrivateToggle = () => {
    setVisibility(!isVisibility);
    setPostcontents({ ...postContents, visibility: isVisibility ? 1 : 0 });
  };

  return (
    <Container className={Column}>
      <PostInputDescription
        descriptions={descriptions}
        setDescriptions={setDescriptions}
      />
      <div className={RegisterContentsStyle}>
        <RegisterLabel label={LABEL_TEXTS.photo} />
        <ImgRegister {...registerProps} />
        <ImgCropper
          {...registerProps}
          {...cropperProps}
        />
      </div>
      <PostPrivateToggle className={Between}>
        <RegisterLabel label={LABEL_TEXTS.postPrivate} />
        <Toggle
          toggleState={isVisibility}
          onClick={handlePrivateToggle}
        />
      </PostPrivateToggle>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 74px;
`;

const PostPrivateToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 26px;
`;

export default PostWriteSection;
