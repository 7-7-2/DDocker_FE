import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/common/Icon';
import { useImgErrorCTA } from '@/hooks/useImgErrorCTA';
import { PostsGridProps } from '@/types/types';
import { ERROR_IMG_TEXTS } from '@/constants/error';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Grid, Center, Flex } from '@/styles/layout';
import { Cursor } from '@/styles/styles';

const ImageErrorCTA = lazy(() => import('@/components/common/ImageErrorCTA'));

const PostsGrid = ({ data: posts, postRef, refetch }: PostsGridProps) => {
  const navigate = useNavigate();
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
        <ErrorContainer className={Flex}>
          <Suspense>
            <ImageErrorCTA
              text={ERROR_IMG_TEXTS.postsGrid}
              handleOnclick={clickRefreshBtn}
            />
          </Suspense>
        </ErrorContainer>
      ) : (
        <GridContainer className={cx(Grid, Center)}>
          {posts &&
            posts.map(item => (
              <GridItemContainer key={item.postId}>
                <GridItem
                  className={Cursor}
                  key={item.postId}
                  id={item.postId}
                  onClick={touchImg}>
                  {item.visibility === 0 && (
                    <PrivateIcon>
                      <Icon {...iconPropsGenerator('lock-grid', '20')} />
                    </PrivateIcon>
                  )}
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

const ErrorContainer = styled.div`
  flex-grow: 1;
`;

const GridContainer = styled.div`
  width: 100dvw;
  margin-left: -20px;
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
const PrivateIcon = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
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
