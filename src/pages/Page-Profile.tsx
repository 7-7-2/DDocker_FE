import { useParams } from 'react-router-dom';

import ProfileDetail from '@/components/profile/ProfileDetail';
import FollowCount from '@/components/profile/FollowCount';
import PostsGrid from '@/components/profile/PostsGrid';
import EmptyPostGrid from '@/components/profile/EmptyPostGrid';
import AnonymousUserCard from '@/components/profile/AnonymousUserCard';

import { UserProfileDataTypes } from '@/types/types';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { getProfilePostIQParam } from '@/hooks/useInfiniteScroll';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';

import { Between, Column } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { PROFILE_TEXTS } from '@/constants/profile';

const { profile } = PROFILE_TEXTS;

const Profile = () => {
  useComposeHeader(true, '', 'icons');
  const { userId: profileId } = useParams();
  const { userId } = useCachedUserInfo();

  const ProfilePostIQParam = getProfilePostIQParam();
  const { data, ref: postRef } = useTargetInfiniteScroll(
    ProfilePostIQParam,
    profile
  );
  const postsData = data && (data as unknown as UserProfileDataTypes[]);
  const allCount = postsData && postsData[0].allCount;

  const followCountData = {
    userId: profileId,
    postCount: postsData && postsData[0].allCount
  };

  const postGrid = allCount ? (
    <PostsGrid
      data={postsData}
      postRef={postRef}
    />
  ) : (
    <EmptyPostGrid
      profileId={profileId}
      userId={userId}
    />
  );

  return profileId !== 'Non-members' ? (
    <Container className={Column}>
      <div className={cx(Column, Between)}>
        <ProfileDetail userId={profileId} />
        <FollowCount data={followCountData} />
      </div>
      {profileId && postGrid}
    </Container>
  ) : (
    <AnonymousUserCard />
  );
};

const Container = styled.div`
  position: relative;
  width: auto;
  margin-top: 20px;
  gap: 20px;
`;

export default Profile;
