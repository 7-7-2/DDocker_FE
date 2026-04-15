import { lazy, Suspense } from 'react';

import EmptyPostGrid from '@/components/profile/EmptyPostGrid';
import PostsGrid from '@/components/profile/PostsGrid';
import PostsList from '@/components/profile/PostsList';
import ImageErrorCTA from '@/components/common/ImageErrorCTA';

import { useImgErrorCTA } from '@/hooks/useImgErrorCTA';
import { getProfilePostIQParam } from '@/hooks/useInfiniteScroll';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { InfinitePosts, UserProfileListDataTypes } from '@/types/types';
import { PROFILE_TEXTS } from '@/constants/profile';
import { ERROR_IMG_TEXTS } from '@/constants/error';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Center, Column, Flex } from '@/styles/layout';

const StandardAccountPosts = ({
  type,
  myProfile,
  isLoading
}: {
  type: string;
  myProfile: boolean;
  isLoading: boolean;
}) => {
  const { isError, isRefresh, handleImgError, handleRefreshBtn } =
    useImgErrorCTA();
  const ProfilePostIQParam: InfinitePosts = getProfilePostIQParam(type);
  const {
    data: postsData,
    ref: postRef,
    refetch
  } = useTargetInfiniteScroll(ProfilePostIQParam, PROFILE_TEXTS.profile);
  const allpostsData = postsData as UserProfileListDataTypes[];
  const imgPostData = postsData?.filter(item => item.photo);
  const isGrid = type === PROFILE_TEXTS.type[0];
  const emptyData = isGrid
    ? imgPostData?.length === 0
    : allpostsData?.length === 0;

  const clickRefreshBtn = () => {
    handleRefreshBtn();
    refetch && !isRefresh && refetch();
  };

  const handleOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log('ff');
    if (!isRefresh) {
      handleImgError();
    } else {
      e.currentTarget.style.opacity = '0';
    }
  };

  return (
    <>
      {isError ? (
        <ErrorContainer className={cx(Flex, Center)}>
          <Suspense>
            <ImageErrorCTA
              text={ERROR_IMG_TEXTS.postsGrid}
              handleOnclick={clickRefreshBtn}
            />
          </Suspense>
        </ErrorContainer>
      ) : (
        <Container className={Column}>
          {!isLoading && emptyData ? (
            <EmptyPostGrid
              myProfile={myProfile}
              isGrid={isGrid}
            />
          ) : !isLoading && isGrid ? (
            <PostsGrid
              data={imgPostData}
              postRef={postRef}
              handleOnError={handleOnError}
            />
          ) : (
            <PostsList
              data={allpostsData}
              postRef={postRef}
              handleOnError={handleOnError}
            />
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  flex-grow: 1;
`;
const ErrorContainer = styled.div`
  flex-grow: 1;
`;

export default StandardAccountPosts;
