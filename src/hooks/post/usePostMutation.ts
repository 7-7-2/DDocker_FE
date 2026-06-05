import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { useGetTodayCoffeeData } from '@/hooks/home/useGetTodayCoffeeData';
import { usePostDataFormatter } from '@/hooks/post/usePostDataFormatter';
import { usePostImageEditor } from '@/hooks/post/usePostImageEditor';
import { useResetRegistInfo } from '@/hooks/post/useResetRegistInfo';
import { useSelectTab } from '@/hooks/useSelectTab';

import {
  caffeineFilterState,
  caffeineIntakeState,
  postContentsState,
  registPostState
} from '@/atoms/atoms';
import { getMyInfo } from '@/api/user';
import { registerCaffeineIntake, registerPost, updatePost } from '@/api/post';
import { FILL_TABS_TEXTS } from '@/constants/common';

const { register } = FILL_TABS_TEXTS;

export const usePostMutation = (
  update?: boolean,
  caffeineRegister?: boolean
) => {
  const registInfo = useRecoilValue(registPostState);
  const [postContents, setPostContents] = useRecoilState(postContentsState);
  const [caffeineIntake, setCaffeineIntake] =
    useRecoilState(caffeineIntakeState);
  const { resetRegistInfo } = useResetRegistInfo();

  // 내용저장
  const { selectedTab } = useSelectTab(register[0]);
  const [descriptions, setDescriptions] = useState<string | null>(
    postContents.description || ''
  );
  useEffect(() => {
    return () => {
      setPostContents({ ...registInfo, description: descriptions });
    };
  }, [descriptions, selectedTab]);

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

  //버튼 활성화 유효성 검사
  const hasContents = descriptions || imageFile || registInfo.photo;
  const validateButtonState = () => {
    const checkCaffeineData =
      caffeine === 0 ? caffeineIntake.caffeine : caffeine;
    if (update)
      return (
        descriptions === registInfo?.description &&
        (!imageFile || !registInfo?.photo)
      );
    if (caffeineRegister) return checkCaffeineData === 0;
    if (!caffeineRegister) return !hasContents || checkCaffeineData === 0;
    else return true;
  };

  const isInvalid = validateButtonState();

  // caffieneIntake 등록 로직
  const handleCaffeineRegister = async () => {
    const caffeineIntakeData = {
      ...caffeineIntake,
      ['caffeine']: caffeine || caffeineIntake.caffeine
    };
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

  //mutate
  const { mutate, isPending } = useMutation({
    mutationKey: ['postRegister', update, caffeineRegister],
    mutationFn: async () => {
      if (update && !caffeineRegister) {
        const res = await handleUpdate();
        return res.postId;
      }
      if (caffeineRegister) {
        const res = await handleCaffeineRegister();
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
    isInvalid,
    caffeine,
    descriptions,
    setDescriptions
  };
};
