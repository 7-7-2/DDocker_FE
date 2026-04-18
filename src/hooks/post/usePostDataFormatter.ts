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
    caffeine: number,
    nonImgPost: boolean,
    description: string | null,
    update?: boolean
  ) => {
    if (update) {
      const { postId, ...updateInfo } = registInfo;
      const updateData = {
        photo: !nonImgPost ? storagePath : null,
        description: description || updateInfo.description,
        visibility: updateInfo.visibility
      };
      return { postId, updateData };
    }
    const newRegistData = {
      ...registInfo,
      caffeine: caffeine,
      photo: !nonImgPost ? storagePath : null,
      postId: postId,
      description: description
    };

    return { postId, newRegistData };
  };

  return { userId, dataFormatter };
};
