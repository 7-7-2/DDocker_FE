import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import CoffeeMenuSelection from '@/components/common/coffeeSelection/CoffeeMenuSelection';
import CoffeeOptionSelection from '@/components/common/coffeeSelection/CoffeeOptionSelection';
import PostWriteSection from '@/components/post/postRegister/PostWriteSection';
import Button from '@/components/common/Button';

import { registPostState } from '@/atoms/atoms';
import { BUTTON_TEXTS } from '@/constants/common';

import { useUpadatePost } from '@/hooks/post/useUpadatePost';
import { usePostMutation } from '@/hooks/post/usePostMutation';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { DefaultBtn, DisabledBtn } from '@/styles/styles';

const PostRegisterForm = ({
  update,
  postid
}: {
  update?: boolean;
  postid?: string;
}) => {
  useUpadatePost(update, postid);
  const { type } = useParams();
  const caffeineRegister = type === 'caffeine';

  const registInfo = useRecoilValue(registPostState);
  const [descriptions, setDescriptions] = useState<string | null>(
    registInfo.description || ''
  );

  // update && description update
  useEffect(() => {
    if (update && registInfo.description) {
      setDescriptions(registInfo.description);
    }
  }, [registInfo.description]);

  //포스트 등록 맟 수정 Hook
  const {
    mutate,
    isPending,
    userId,
    registerProps,
    cropperProps,
    imageFile,
    caffeine
  } = usePostMutation(update, descriptions);

  //유효성 검사
  const hasContents = descriptions || imageFile || registInfo.photo;
  const updateInvalid =
    update &&
    descriptions === registInfo?.description &&
    (!imageFile || !registInfo?.photo);
  const isInvalid =
    (!update && !caffeine) ||
    updateInvalid ||
    (!caffeineRegister && !hasContents);

  // 등록 및 수정 버튼
  const clickRegisterBtn = () => {
    !isPending && userId && mutate();
  };

  return (
    <>
      <Container>
        <CoffeeMenuSelection />
        <CoffeeOptionSelection />
        {!caffeineRegister && (
          <PostWriteSection
            descriptions={descriptions}
            setDescriptions={setDescriptions}
            registerProps={registerProps}
            cropperProps={cropperProps}
          />
        )}
      </Container>
      <BtnArea />
      <Button
        text={!update ? BUTTON_TEXTS.register : BUTTON_TEXTS.update}
        onClick={clickRegisterBtn}
        disabled={isInvalid}
        className={cx(isInvalid ? DisabledBtn : undefined, DefaultBtn, Stiky)}
      />
    </>
  );
};

const Container = styled.div`
  padding: 0 2px;
  margin: 0 -2px;
  overflow-y: auto;
`;

const BtnArea = styled.div`
  position: sticky;
  height: 48px;
  margin: 0 -20px;
  bottom: 0;
  background-color: #fff;
  overscroll-behavior: none;
`;

const Stiky = css`
  position: sticky;
  bottom: 10px;
  overscroll-behavior: none;
`;

export default PostRegisterForm;
