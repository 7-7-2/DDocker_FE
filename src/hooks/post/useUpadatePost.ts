import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { getPostDetail } from '@/api/post';
import { registPostState } from '@/atoms/atoms';
import { RegisterPostTypes } from '@/types/types';
import { brandMapToEng } from '@/utils/convertBrandName';

export const useUpadatePost = (
  update: boolean | undefined,
  postid: string | undefined
) => {
  const setRegistInfo = useSetRecoilState(registPostState);
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
      setRegistInfo({
        brand: brandMapToEng(postData.brand),
        menu: postData.menu,
        size: postData.size,
        shot: postData.shot,
        description: postData.description,
        intensity: postData.intensity,
        caffeine: postData.caffeine,
        post_title: postData.post_title || '',
        photo: postData.photo,
        postId: postid
      });
  };

  useEffect(() => {
    update && postData && updatePostInfo(postData.data);
  }, [update, postData]);
};
