import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CoffeeOptionSelection from '@/components/common/CoffeeOptionSelection';
import CoffeeMenuSelection from '@/components/home/CoffeeMenuSelection';
import RegisterLabel from '@/components/post/RegisterLabel';
import Button from '@/components/common/Button';
import { BUTTON_TEXTS, LABEL_TEXTS } from '@/constants/common';

import { caffeineFilterState, registPostState } from '@/atoms/atoms';
import { getMyInfo } from '@/api/user';
import { getTodayCoffeeInfo, setPostRegist } from '@/api/post';
import { useShowFooter } from '@/hooks/useShowFooter';
import useResetSelectedCoffee from '@/hooks/useResetSelectedCoffee';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { DefaultBtn } from '@/styles/styles';
import PostInputTitle from '@/components/post/PostInputTitle';
import { useImageCropper } from '@/hooks/post/useImageCropper';
import ImgRegister from '@/components/common/ImgRegister';
import ImgCropper from '@/components/common/ImgCropper';
import { nanoid } from 'nanoid';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useCompressImage } from '@/hooks/useCompressImage';

const imagePath = import.meta.env.VITE_R2_POST_IMAGE_PATH;

const PostRegister = () => {
  useShowFooter(false);
  const { caffeine } = useRecoilValue(caffeineFilterState);
  const registInfo = useRecoilValue(registPostState);
  const resetSelectedCoffee = useResetSelectedCoffee();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { userId } = useCachedUserInfo();
  const { uploadStorage } = useCloudStorage();

  const {
    imageUrl,
    setImageUrl,
    setImageFile,
    imageFile,
    setCropperEnabled,
    cropperEnabled
  } = useImageCropper();
  const { compressImage, isLoading } = useCompressImage();
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

  const handleRegistData = async (postTitle: string | undefined) => {
    const postId = nanoid();
    const storagePath = `${imagePath}%2F${userId}%2F${postId}`;
    return {
      ...registInfo,
      caffeine: caffeine,
      post_title: postTitle,
      photo: storagePath,
      postId: postId
    };
  };

  const updateData = async () => {
    await getTodayCoffeeInfo();
    await getMyInfo();
  };

  const clickRegisterBtn = async () => {
    const newRegistData = await handleRegistData(inputRef.current?.value);
    const { postId } = newRegistData;
    const registered = await setPostRegist(newRegistData);
    registered &&
      (await uploadStorage(`post/${userId}/${postId}`, imageFile as File));

    await updateData();
    resetSelectedCoffee();
    URL.revokeObjectURL(imageUrl);
    registered && navigate(`/post/${postId}`);
  };

  return (
    <>
      <Container>
        <CoffeeMenuSelection />
        <CoffeeOptionSelection />
        <RegisterLabel label={LABEL_TEXTS.title} />
        <PostInputTitle inputRef={inputRef} />
        <RegisterLabel
          label={LABEL_TEXTS.photo}
          essential
        />
        <ImgRegister {...registerProps} />
        <ImgCropper
          {...registerProps}
          {...cropperProps}
        />
      </Container>

      <Button
        text={BUTTON_TEXTS.regist}
        onTouchEnd={userId && clickRegisterBtn}
        className={cx(DefaultBtn, BtnContainer)}
      />
    </>
  );
};

const Container = styled.div`
  padding-bottom: 28px;
  overflow-x: visible;
  overflow-y: auto;
`;

const BtnContainer = css`
  position: sticky;
  bottom: 10px;
`;

export default PostRegister;
