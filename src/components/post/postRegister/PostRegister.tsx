import { lazy, useRef } from 'react';
import { nanoid } from 'nanoid';
import { constSelector, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import CoffeeMenuSelection from '@/components/common/coffeeSelection/CoffeeMenuSelection';
import CoffeeOptionSelection from '@/components/common/coffeeSelection/CoffeeOptionSelection';
import PostWriteSection from '@/components/post/postRegister/PostWriteSection';
import Button from '@/components/common/Button';

import { getMyInfo } from '@/api/user';
import { setPostRegist, updatePost } from '@/api/post';
import { caffeineFilterState, registPostState } from '@/atoms/atoms';
import { BUTTON_TEXTS, MODAL_CTA_TEXTS } from '@/constants/common';

import { useImageCropper } from '@/hooks/post/useImageCropper';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useCompressImage } from '@/hooks/useCompressImage';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useUpadatePost } from '@/hooks/post/useUpadatePost';
import { useResetSelectedCoffee } from '@/hooks/useResetSelectedCoffee';
import { useGetTodayCoffeeData } from '@/hooks/home/useGetTodayCoffeeData';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { DefaultBtn, DisabledBtn, Spinner } from '@/styles/styles';
import { Align, Center } from '@/styles/layout';
import { usePostDataFormatter } from '@/hooks/post/usePostDataFormatter';

const ModalCTA = lazy(() => import('@/components/common/ModalCTA'));

const { signIn2 } = BUTTON_TEXTS;
const { signIn } = MODAL_CTA_TEXTS;

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
  const { isModal } = useVerifyModalCTA();
  const { updateTodayCoffeeData: getTodayCoffeeData } = useGetTodayCoffeeData();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { userId } = useCachedUserInfo();
  const { uploadStorage } = useCloudStorage();

  // 사진 업로드
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

  const { dataFormatter } = usePostDataFormatter();
  const handleRegister = async () => {
    const { postId, newRegistData } = await dataFormatter(
      inputRef.current?.value,
      caffeine,
      textAreaRef?.current?.value
    );
    const registered = newRegistData && (await setPostRegist(newRegistData));
    const imgUploaded =
      (await registered) &&
      (await uploadStorage(`post/${userId}/${postId}`, imageFile as File));
    return imgUploaded && { registered, postId };
  };

  const handleUpdate = async () => {
    const { postId, updateData } = await dataFormatter(
      inputRef.current?.value,
      caffeine,
      textAreaRef?.current?.value,
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

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { registered, postId } = !update
        ? await handleRegister()
        : await handleUpdate();
      await updateTodayCoffeeData();
      URL.revokeObjectURL(imageUrl);
      registered &&
        navigate(`/post/${postId}`, {
          state: true
        });
    }
  });

  const clickRegisterBtn = () => {
    !isPending && userId && mutate();
  };

  const handleActions: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/start/1');
  };

  return (
    <>
      {isPending && (
        <LoadingPage className={cx(Align)}>
          <div className={cx(Spinner, Center)} />
        </LoadingPage>
      )}
      {isModal && (
        <ModalCTA
          actionText={signIn2}
          text={signIn.register}
          fn={handleActions}
          type={'register'}
        />
      )}
      <Container>
        <CoffeeMenuSelection />
        <CoffeeOptionSelection />
        <PostWriteSection
          inputRef={inputRef}
          textAreaRef={textAreaRef}
          registerProps={registerProps}
          cropperProps={cropperProps}
        />
      </Container>
      <Button
        text={!update ? BUTTON_TEXTS.register : BUTTON_TEXTS.update}
        onClick={clickRegisterBtn}
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
  padding: 0 2px;
  margin: 0 -2px;
  overflow-y: auto;
`;

const BtnContainer = css`
  position: sticky;
  bottom: 10px;
`;

const LoadingPage = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.724);
`;

export default PostRegister;
