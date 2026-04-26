import React from 'react';
import { useRecoilState } from 'recoil';

import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { isModalState } from '@/atoms/atoms';

import { styled } from 'styled-system/jsx';
import { DVW } from '@/styles/layout';

type NewType = React.ReactNode;

const ActionModal = ({
  handleActionModal,
  children
}: {
  handleActionModal?: () => void;
  children: NewType;
}) => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const handleModal = () => {
    handleActionModal ? handleActionModal() : setIsModal(!isModal);
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
