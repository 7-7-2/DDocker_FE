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
import { useUploadStorage } from '@/hooks/useUploadStorage';

const imagePath = import.meta.env.VITE_R2_POST_IMAGE_PATH;

const PostRegister = () => {
  useShowFooter(false);
  const { caffeine } = useRecoilValue(caffeineFilterState);
  const registInfo = useRecoilValue(registPostState);
  const resetSelectedCoffee = useResetSelectedCoffee();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { userId } = useCachedUserInfo();
  const uploadStorage = useUploadStorage();

  const {
    imageUrl,
    setImageUrl,
    setImageFile,
    imageFile,
    setCropperEnabled,
    cropperEnabled
  } = useImageCropper();

  const handleRegistData = async (postTitle: string | undefined) => {
    const postId = nanoid();
    const route = `post/${userId}/${postId}`;
    await uploadStorage(route, imageFile as File);

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
    await updateData();
    resetSelectedCoffee();
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
        <ImgRegister
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          setCropperEnabled={setCropperEnabled}
        />
        <ImgCropper
          aspectRatio={1}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setImageFile={setImageFile}
          cropperEnabled={cropperEnabled}
          setCropperEnabled={setCropperEnabled}
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
