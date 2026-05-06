import { Suspense, lazy } from 'react';

import { useImgErrorCTA } from '@/hooks/useImgErrorCTA';
import { PostBodyProps } from '@/types/types';
import { ERROR_IMG_TEXTS } from '@/constants/error';

import { styled } from 'styled-system/jsx';
import { PostContent } from '@/styles/styles';

const ImageErrorCTA = lazy(() => import('../../common/ImageErrorCTA'));

const PostBody = ({ description, photo, onClick }: PostBodyProps) => {
  const { isError, handleImgError, setUrl, handleReloadImg, reloadPhoto } =
    useImgErrorCTA();

  const handleOnError = () => {
    handleImgError();
    setUrl(photo);
  };

  return (
    <>
      {description && (
        <PostContent onClick={onClick}>{description}</PostContent>
      )}
      {isError ? (
        <ImgErrorContainer>
          <Suspense>
            <ImageErrorCTA
              text={ERROR_IMG_TEXTS.img}
              handleOnclick={handleReloadImg}
            />
          </Suspense>
        </ImgErrorContainer>
      ) : (
        (reloadPhoto || photo) && (
          <PostImg
            src={reloadPhoto || photo}
            onClick={onClick}
            onError={handleOnError}
          />
        )
      )}
    </>
  );
};

const PostImg = styled.img`
  border-radius: 10px;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  margin-top: 12px;
`;

const ImgErrorContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--colors-tertiary);
`;

export default PostBody;
