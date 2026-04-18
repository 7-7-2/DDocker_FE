import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { getPostDetail } from '@/api/post';
import { caffeineIntakeState, postContentsState } from '@/atoms/atoms';
import { RegisterPostTypes } from '@/types/types';

export const useUpadatePost = (
  update: boolean | undefined,
  postid: string | undefined
) => {
  const setCaffeineIntake = useSetRecoilState(caffeineIntakeState);
  const setPostContentsState = useSetRecoilState(postContentsState);

  const postNum = postid as string;

  const { data: postData } = useQuery({
    queryKey: ['postData'],
    queryFn: () => {
      return getPostDetail(postNum);
    },
    enabled: !!postid
  });

  const updatePostInfo = (postData: RegisterPostTypes) => {
    postData &&
      postid &&
      setCaffeineIntake({
        caffeine: postData.caffeine,
        brand: postData.brand,
        productName: postData.productName,
        size: postData.size,
        intensity: postData.intensity,
        shot: postData.shot
      });
    postData &&
      postid &&
      setPostContentsState({
        postId: postid,
        description: postData.description,
        photo: postData.photo,
        visibility: postData.visibility
      });
  };

  useEffect(() => {
    update && postData && updatePostInfo(postData.data);
  }, [update, postData]);
};
