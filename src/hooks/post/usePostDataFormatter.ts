import { useRecoilValue } from 'recoil';
import { nanoid } from 'nanoid';

import { registPostState } from '@/atoms/atoms';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';

const imagePath = import.meta.env.VITE_R2_POST_IMAGE_PATH;

export const usePostDataFormatter = (update?: boolean) => {
  const registInfo = useRecoilValue(registPostState);
  const { userId } = useCachedUserInfo();
  const postId = update ? registInfo.postId : nanoid();

  const storagePath = `${imagePath}%2F${userId}%2F${postId}`;

  const dataFormatter = async (
    postTitle: string | undefined,
    caffeine: number,
    textAreaRef?: string | null,
    update?: boolean
  ) => {
    if (update) {
      const { postId, ...updateInfo } = registInfo;
      const updateData = {
        ...updateInfo,
        post_title: postTitle,
        caffeine: caffeine || updateInfo.caffeine,
        photo: storagePath,
        description: textAreaRef || updateInfo.description
      };
      return { postId, updateData };
    }

    const newRegistData = {
      ...registInfo,
      caffeine: caffeine,
      post_title: postTitle,
      photo: storagePath,
      postId: postId,
      description: textAreaRef || null
    };

    return { postId, newRegistData };
  };

  return { userId, dataFormatter };
};
