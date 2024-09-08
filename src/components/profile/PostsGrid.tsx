import { lazy, Suspense, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useImgErrorCTA } from '@/hooks/useImgErrorCTA';
import { PostsGridProps, UserProfilePostsTypes } from '@/types/types';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Grid, Center } from '@/styles/layout';
import { Cursor } from '@/styles/styles';
import { ERROR_IMG_TEXTS } from '@/constants/error';

const ImageErrorCTA = lazy(() => import('@/components/common/ImageErrorCTA'));

const PostsGrid = ({ data, postRef, refetch }: PostsGridProps) => {
  const navigate = useNavigate();
  const posts = data && data.flatMap(item => item.posts);

  const { isError, isRefresh, handleImgError, handleRefreshBtn } =
    useImgErrorCTA();

  const touchImg: React.MouseEventHandler<HTMLImageElement> = (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    navigate(`/post/${e.currentTarget.id}`);
  };

  const clickRefreshBtn = () => {
    handleRefreshBtn();
    refetch && !isRefresh && refetch();
  };

  const handleOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!isRefresh) {
      handleImgError();
    } else {
      e.currentTarget.style.opacity = '0';
    }
  };

  return (
    <>
      {isError ? (
        <Container>
          <Suspense>
            <ImageErrorCTA
              text={ERROR_IMG_TEXTS.postsGrid}
              handleOnclick={clickRefreshBtn}
            />
          </Suspense>
        </Container>
      ) : (
        <GridContainer className={cx(Grid, Center)}>
          {posts &&
            posts.map((item: UserProfilePostsTypes) => (
              <GridItemContainer key={item.postId}>
                <GridItem
                  className={Cursor}
                  key={item.postId}
                  id={item.postId}
                  onClick={touchImg}>
                  <PostImg
                    onError={handleOnError}
                    src={item.photo}
                  />
                </GridItem>
              </GridItemContainer>
            ))}
          <Target ref={postRef} />
        </GridContainer>
      )}
    </>
  );
};

const Container = styled.div`
  height: calc(100vh - 460px);
`;

const GridContainer = styled.div`
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
`;

const GridItemContainer = styled.div`
  width: 100%;
  position: relative;
  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const PostImg = styled.img`
  /* position: absolute; */
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GridItem = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: var(--colors-tertiary);
`;

const Target = styled.div`
  height: 1px;
`;

export default PostsGrid;
