import { lazy, Suspense } from 'react';

import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { getProfilePostIQParam } from '@/hooks/useInfiniteScroll';

import { PROFILE_TEXTS } from '@/constants/profile';
import { InfinitePosts, UserProfileDataTypes } from '@/types/types';

import { Between, Column } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const EmptyPostGrid = lazy(() => import('@/components/profile/EmptyPostGrid'));
const PostsGrid = lazy(() => import('@/components/profile/PostsGrid'));
const FollowCount = lazy(() => import('@/components/profile/FollowCount'));
const ProfileDetail = lazy(() => import('@/components/profile/ProfileDetail'));

const { profile } = PROFILE_TEXTS;

const MemberProfile = ({
  userId,
  profileId
}: {
  userId: string;
  profileId: string | undefined;
}) => {
  const ProfilePostIQParam: InfinitePosts = getProfilePostIQParam();
  const {
    data,
    ref: postRef,
    refetch
  } = useTargetInfiniteScroll(ProfilePostIQParam, profile);
  const postsData = data && (data as unknown as UserProfileDataTypes[]);
  const allCount = postsData && postsData[0].allCount;

  const followCountData = {
    userId: profileId,
    postCount: postsData && postsData[0].allCount
  };

  return (
    <Container className={Column}>
      <div className={cx(Column, Between)}>
        <Suspense>
          <ProfileDetail userId={profileId} />
          <FollowCount data={followCountData} />
        </Suspense>
      </div>
      {allCount != 0 ? (
        <Suspense>
          <PostsGrid
            data={postsData}
            postRef={postRef}
            refetch={refetch}
          />
        </Suspense>
      ) : (
        <Suspense>
          <EmptyPostGrid
            profileId={profileId}
            userId={userId}
          />
        </Suspense>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: auto;
  margin-top: 20px;
  gap: 20px;
`;

export default MemberProfile;
