import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { getMyInfo } from '@/api/user';
import { registerCaffeineIntake, registerPost, updatePost } from '@/api/post';
import {
  caffeineFilterState,
  caffeineIntakeState,
  registPostState
} from '@/atoms/atoms';

import { useGetTodayCoffeeData } from '@/hooks/home/useGetTodayCoffeeData';
import { usePostDataFormatter } from '@/hooks/post/usePostDataFormatter';
import { usePostImageEditor } from '@/hooks/post/usePostImageEditor';
import { useResetRegistInfo } from '@/hooks/post/useResetRegistInfo';

export const usePostMutation = (
  descriptions: string | null,
  update?: boolean,
  caffeineRegister?: boolean
) => {
  const registInfo = useRecoilValue(registPostState);
  const [caffeineIntake, setCaffeineIntake] =
    useRecoilState(caffeineIntakeState);
  const { resetRegistInfo } = useResetRegistInfo();

  // 이미지
  const { imageUrl, imageFile, uploadStorage, registerProps, cropperProps } =
    usePostImageEditor(registInfo.photo);
  const nonImgPost = !imageFile;

  //데이터 가공
  const { caffeine } = useRecoilValue(caffeineFilterState);
  const { dataFormatter, userId } = usePostDataFormatter(update);

  // 후처리
  const navigate = useNavigate();
  const { updateTodayCoffeeData: getTodayCoffeeData } = useGetTodayCoffeeData();
  const registrationSuccessViewData = async () => {
    setCaffeineIntake({ ...caffeineIntake, ['caffeine']: caffeine });
  };

  // caffieneIntake 등록 로직
  const handleCaffeineRegister = async () => {
    const caffeineIntakeData = { ...caffeineIntake, ['caffeine']: caffeine };
    const registered = await registerCaffeineIntake(caffeineIntakeData);
    return registered;
  };

  //post 등록 로직
  const handleRegister = async () => {
    const { postId, newRegistData } = await dataFormatter(
      caffeine,
      nonImgPost,
      descriptions
    );
    const registered = newRegistData && (await registerPost(newRegistData));
    if (!nonImgPost) {
      const imgUploaded =
        (await registered) &&
        (await uploadStorage('post', userId, postId, imageFile as File));
      return imgUploaded && { registered, postId };
    }
    return { registered, postId };
  };

  //post 수정 로직
  const handleUpdate = async () => {
    const { postId, updateData } = await dataFormatter(
      registInfo.caffeine,
      nonImgPost,
      descriptions,
      update
    );
    const registered =
      postId && updateData && (await updatePost(postId, updateData));
    if (!nonImgPost) {
      const imgUpdated =
        (await registered) &&
        imageFile &&
        (await uploadStorage('post', userId, postId, imageFile as File));
      return imgUpdated && { registered, postId };
    }
    return { registered, postId };
  };

  //후처리 로직
  const updateTodayCoffeeData = async () => {
    await getMyInfo();
    await getTodayCoffeeData();
    await registrationSuccessViewData();
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ['postRegister'],
    mutationFn: async () => {
      if (update && !caffeineRegister) {
        const res = await handleUpdate();
        return res.postId;
      }
      if (caffeineRegister) {
        const res = await handleCaffeineRegister();
        console.log(res);
        return;
      }
      const res = await handleRegister();
      return res.postId;
    },
    onSuccess: (postId: string | null) => {
      updateTodayCoffeeData();
      if (imageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
      if (update) {
        resetRegistInfo();
        return navigate(`/post/${postId}`);
      }
      const navigateUrl = !caffeineRegister
        ? `/post/${postId}/caffeine`
        : '/post/caffeineIntake/caffeine';
      navigate(navigateUrl);
    }
  });

  return {
    mutate,
    isPending,
    userId,
    registerProps,
    cropperProps,
    imageFile,
    caffeine
  };
};
