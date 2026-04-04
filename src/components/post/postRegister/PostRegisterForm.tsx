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

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { BottomBtnContainer, DefaultBtn, DisabledBtn } from '@/styles/styles';

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
  } = usePostMutation(descriptions, update, caffeineRegister);

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
      <ButtonContainer className={BottomBtnContainer}>
        <Button
          text={!update ? BUTTON_TEXTS.registered : BUTTON_TEXTS.update}
          onClick={clickRegisterBtn}
          disabled={isInvalid}
          className={cx(isInvalid && DisabledBtn, DefaultBtn)}
        />
      </ButtonContainer>
    </>
  );
};

const Container = styled.div`
  padding: 0 2px;
  margin: 0 0 50px;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  background-color: #fff;
  box-shadow: 1px 0 0 0#fff;
`;

export default PostRegisterForm;
