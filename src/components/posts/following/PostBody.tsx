import CafeDetail from '@/components/post/CafeDetail';
import ImageErrorCTA from '@/components/common/ImageErrorCTA';
import { useImgErrorCTA } from '@/hooks/useImgErrorCTA';
import { FollowingPost } from '@/types/types';

import { styled } from 'styled-system/jsx';
import { PostContent } from '@/styles/styles';
import { PaddingT12 } from '@/styles/styles';

const PostBody = ({
  postTitle,
  photo,
  caffeine,
  shot,
  menu,
  brand,
  onTouchEnd
}: Pick<
  FollowingPost,
  'postTitle' | 'photo' | 'caffeine' | 'shot' | 'menu' | 'brand'
> & { onTouchEnd: () => void }) => {
  const CafeDetailProps = {
    brand,
    caffeine,
    shot,
    menu,
    className: PaddingT12,
    posts: true,
    onTouchEnd
  };

  const { isError, handleImgError, setUrl, handleReloadImg, reloadPhoto } =
    useImgErrorCTA();

  const ImgErrorCTA = (
    <ImgErrorContainer>
      <ImageErrorCTA
        text={'이미지를 로드할 수 없습니다.'}
        handleOnclick={handleReloadImg}
      />
      ;
    </ImgErrorContainer>
  );

  const handleOnError = () => {
    handleImgError();
    setUrl(photo);
  };

  return (
    <>
      <PostContent onClick={onTouchEnd}>{postTitle}</PostContent>
      {isError ? (
        ImgErrorCTA
      ) : (
        <PostImg
          src={reloadPhoto || photo}
          onClick={onTouchEnd}
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
  height: 220px;
  width: 100%;
  height: auto;
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
