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
  const registInfo = useRecoilValue(registPostState);
  const [descriptions, setDescriptions] = useState<string | null>(
    registInfo.description || ''
  );

  //post type
  const { type } = useParams();
  const caffeineRegister = type === 'caffeine';
  useUpadatePost(update, postid);

  // update && description update
  useEffect(() => {
    if (update && registInfo.description) {
      setDescriptions(registInfo.description);
    }
  }, [registInfo.description]);

  //포스트 등록 맟 수정 Hook
  const { mutate, isPending, userId, registerProps, cropperProps, isInvalid } =
    usePostMutation(descriptions, update, caffeineRegister);

  // 등록 및 수정 버튼
  const clickRegisterBtn = () => {
    !isPending && userId && mutate();
  };

  return (
    <>
      <Container>
        <Update aria-disabled={update ? true : false}>
          <CoffeeMenuSelection />
          <CoffeeOptionSelection />
        </Update>
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
          className={cx(!isInvalid ? DefaultBtn : DisabledBtn, DefaultBtn)}
        />
      </ButtonContainer>
    </>
  );
};

const Container = styled.div`
  padding: 0 2px;
  margin-bottom: 50px;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  background-color: #fff;
  box-shadow: 1px 0 0 0#fff;
`;

const Update = styled.div`
  &[aria-disabled='true'] {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 40%;
  }
`;
export default PostRegisterForm;
