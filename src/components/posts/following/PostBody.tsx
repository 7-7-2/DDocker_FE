import CafeDetail from '@/components/post/CafeDetail';
import { useImgErrorCTA } from '@/hooks/useImgErrorCTA';
import { FollowingPost } from '@/types/types';

import { styled } from 'styled-system/jsx';
import { PostContent } from '@/styles/styles';
import { PaddingT12 } from '@/styles/styles';
import { Suspense, lazy } from 'react';

const ImageErrorCTA = lazy(() => import('../../common/ImageErrorCTA'));

const PostBody = ({
  postTitle,
  photo,
  caffeine,
  shot,
  menu,
  brand,
  onClick
}: Pick<
  FollowingPost,
  'postTitle' | 'photo' | 'caffeine' | 'shot' | 'menu' | 'brand'
> & { onClick: () => void }) => {
  const CafeDetailProps = {
    brand,
    caffeine,
    shot,
    menu,
    className: PaddingT12,
    posts: true,
    onClick
  };

  const { isError, handleImgError, setUrl, handleReloadImg, reloadPhoto } =
    useImgErrorCTA();

  const handleOnError = () => {
    handleImgError();
    setUrl(photo);
  };

  return (
    <>
      <PostContent onClick={onClick}>{postTitle}</PostContent>
      {isError ? (
        <ImgErrorContainer>
          <Suspense>
            <ImageErrorCTA
              text={'이미지를 로드할 수 없습니다.'}
              handleOnclick={handleReloadImg}
            />
          </Suspense>
        </ImgErrorContainer>
      ) : (
        <PostImg
          src={reloadPhoto || photo}
          onClick={onClick}
          onError={handleOnError}
        />
      )}

      <CafeDetail {...CafeDetailProps} />
    </>
  );
};

const PostImg = styled.img`
  margin-top: -4px;
  border-radius: 16px;
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1.4 / 1;
`;

const ImgErrorContainer = styled.div`
  margin-top: -4px;
  border-radius: 16px;
  height: 220px;
  width: 100%;
  background-color: var(--colors-tertiary);
`;

export default PostBody;
