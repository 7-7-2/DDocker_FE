import { isActionModalState, isModalState } from '@/atoms/atoms';
import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { useCommentAction } from '@/hooks/post/useCommentAction';
import { DVW } from '@/styles/layout';
import React from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-system/jsx';

const ActionModal = ({
  type,
  children
}: {
  type?: string;
  children: React.ReactNode;
}) => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const [isActionModal, setIsActionMaodal] = useRecoilState(isActionModalState);
  const handleModal = () => {
    type === 'comment'
      ? setIsActionMaodal(!isActionModal)
      : setIsModal(!isModal);
  };

  return (
    <Container className={DVW}>
      <BackgroundLayer onClick={handleModal}>
        <PostOptions>
          <>{children}</>
        </PostOptions>
      </BackgroundLayer>
    </Container>
  );
};
const Container = styled.div``;
export default ActionModal;
