import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { nanoid } from 'nanoid';

import CoffeeMenuSelection from '@/components/home/CoffeeMenuSelection';
import PostInputTitle from '@/components/post/PostInputTitle';
import RegisterLabel from '@/components/post/RegisterLabel';
import CoffeeOptionSelection from '@/components/common/CoffeeOptionSelection';
import ImgRegister from '@/components/common/ImgRegister';
import ImgCropper from '@/components/common/ImgCropper';
import Button from '@/components/common/Button';

import { getMyInfo } from '@/api/user';
import { setPostRegist, updatePost } from '@/api/post';
import { caffeineFilterState, registPostState } from '@/atoms/atoms';
import { BUTTON_TEXTS, LABEL_TEXTS } from '@/constants/common';

import { useUpadatePost } from '@/hooks/post/useUpadatePost';
import { useImageCropper } from '@/hooks/post/useImageCropper';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useCompressImage } from '@/hooks/useCompressImage';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useResetSelectedCoffee } from '@/hooks/useResetSelectedCoffee';
import { useGetTodayCoffeeData } from '@/hooks/home/useGetTodayCoffeeData';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { DefaultBtn, DisabledBtn } from '@/styles/styles';

const imagePath = import.meta.env.VITE_R2_POST_IMAGE_PATH;

const PostRegister = ({
  update,
  postid
}: {
  update?: boolean;
  postid?: string;
}) => {
  useShowFooter(false);
  useUpadatePost(update, postid);
  const { caffeine } = useRecoilValue(caffeineFilterState);
  const registInfo = useRecoilValue(registPostState);
  const resetSelectedCoffee = useResetSelectedCoffee();
  const { updateTodayCoffeeData: getTodayCoffeeData } = useGetTodayCoffeeData();
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
  } = useImageCropper(registInfo.photo);

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

  const handleRequestData = async (
    postTitle: string | undefined,
    update?: boolean
  ) => {
    const postId = update ? registInfo.postId : nanoid();
    const storagePath = `${imagePath}%2F${userId}%2F${postId}`;

    if (update) {
      const { postId, ...updateInfo } = registInfo;
      const updateData = {
        ...updateInfo,
        post_title: postTitle,
        caffeine: caffeine || updateInfo.caffeine,
        photo: storagePath
      };
      return { postId, updateData };
    }

    const newRegistData = {
      ...registInfo,
      caffeine: caffeine,
      post_title: postTitle,
      photo: storagePath,
      postId: postId
    };

    return { postId, newRegistData };
  };

  const handleRegister = async () => {
    const { postId, newRegistData } = await handleRequestData(
      inputRef.current?.value
    );
    const registered = newRegistData && (await setPostRegist(newRegistData));

    const imgUploaded =
      registered &&
      (await uploadStorage(`post/${userId}/${postId}`, imageFile as File));

    return imgUploaded && { registered, postId };
  };

  const handleUpdate = async () => {
    const { postId, updateData } = await handleRequestData(
      inputRef.current?.value,
      update
    );
    const registered =
      postId && updateData && (await updatePost(postId, updateData));
    registered &&
      imageFile &&
      (await uploadStorage(`post/${userId}/${postId}`, imageFile as File));
    return { registered, postId };
  };

  const updateTodayCoffeeData = async () => {
    await getMyInfo();
    await getTodayCoffeeData();
    resetSelectedCoffee();
  };

  const clickRegisterBtn = async () => {
    const { registered, postId } = !update
      ? await handleRegister()
      : await handleUpdate();
    await updateTodayCoffeeData();
    URL.revokeObjectURL(imageUrl);
    registered &&
      navigate(`/post/${postId}`, {
        state: true
      });
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
        text={!update ? BUTTON_TEXTS.regist : BUTTON_TEXTS.update}
        onClick={userId && clickRegisterBtn}
        className={cx(
          imageFile && caffeine
            ? undefined
            : registInfo.caffeine
              ? undefined
              : DisabledBtn,
          DefaultBtn,
          BtnContainer
        )}
      />
    </>
  );
};

const Container = styled.div`
  padding-bottom: 28px;
  margin-bottom: 20px;
  overflow-x: visible;
  overflow-y: auto;
`;

const BtnContainer = css`
  position: sticky;
  bottom: 10px;
`;

export default PostRegister;
