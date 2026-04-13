import { isModalState } from '@/atoms/atoms';
import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { DVW } from '@/styles/layout';
import React from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-system/jsx';

const ActionModal = ({ children }: { children: React.ReactNode }) => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const handleModal = () => {
    setIsModal(!isModal);
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
