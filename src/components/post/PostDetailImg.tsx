import { useImgErrorCTA } from '@/hooks/useImgErrorCTA';
import { ERROR_IMG_TEXTS } from '@/constants/error';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column, Flex } from '@/styles/layout';

const PostDetailImg = ({ postImg }: { postImg: string }) => {
  const { isError, handleImgError } = useImgErrorCTA();
  return (
    <Container className={Flex}>
      {!isError ? (
        <img
          className={DetailImgStyle}
          src={postImg}
          onError={handleImgError}
        />
      ) : (
        <ErrorImgContainer className={cx(Column, DetailImgStyle)}>
          <ErrorText>{ERROR_IMG_TEXTS.detailImg}</ErrorText>
        </ErrorImgContainer>
      )}
    </Container>
  );
};
const DetailImgStyle = css`
  display: block;
  position: relative;
  margin-left: -20px;
  margin-right: -20px;
  height: 100vw;
  @media (max-width: 500px) {
    min-width: 100vw;
  }
  @media (min-width: 500px) {
    max-width: 500px;
  }
  max-height: 500px;
  object-fit: fill;
  aspect-ratio: 1/1;
`;

const Container = styled.div`
  margin: 10px 0;
`;

const ErrorImgContainer = styled.div`
  white-space: pre-wrap;
  text-align: center;
  background-color: var(--colors-tertiary);
  color: var(--colors-subtext);
  flex-grow: 1;
`;
const ErrorText = styled.span`
  align-content: center;
  margin: auto 0;
`;
export default PostDetailImg;
