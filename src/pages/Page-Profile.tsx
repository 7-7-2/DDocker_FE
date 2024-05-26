import { lazy } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { getProfilePostIQParam } from '@/hooks/useInfiniteScroll';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';

import { BUTTON_TEXTS, MODAL_CTA_TEXTS } from '@/constants/common';
import { PROFILE_TEXTS } from '@/constants/profile';
import { isModalState } from '@/atoms/atoms';
import { InfinitePosts, UserProfileDataTypes } from '@/types/types';

import { Between, Column } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const ModalCTA = lazy(() => import('../components/common/ModalCTA'));
const AnonymousUserCard = lazy(
  () => import('../components/profile/AnonymousUserCard')
);
const EmptyPostGrid = lazy(() => import('../components/profile/EmptyPostGrid'));
const PostsGrid = lazy(() => import('../components/profile/PostsGrid'));
const FollowCount = lazy(() => import('../components/profile/FollowCount'));
const ProfileDetail = lazy(() => import('../components/profile/ProfileDetail'));

const { profile, nonMemberId } = PROFILE_TEXTS;
const { signIn2 } = BUTTON_TEXTS;
const { signIn } = MODAL_CTA_TEXTS;

const Profile = () => {
  useComposeHeader(true, '', 'icons');
  const { userId: profileId } = useParams();
  const { userId } = useCachedUserInfo();
  const isModal = useRecoilValue(isModalState);
  const goToSignIn = useNavigateTo('/start/1');
  const nonMembers = profileId === nonMemberId;

  const ProfilePostIQParam: InfinitePosts = !nonMembers
    ? getProfilePostIQParam()
    : ({} as InfinitePosts);

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

  const postGrid =
    allCount != 0 ? (
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
  const handleActions: React.TouchEventHandler<HTMLButtonElement> = () => {
    goToSignIn();
  };

  const AnonymousModalCTA = isModal && !userId && (
    <ModalCTA
      actionText={signIn2}
      text={signIn.text}
      fn={handleActions}
    />
  );

  return !nonMembers ? (
    <>
      {AnonymousModalCTA}
      <Container className={Column}>
        <div className={cx(Column, Between)}>
          <ProfileDetail userId={profileId} />
          <FollowCount data={followCountData} />
        </div>
        {postGrid}
      </Container>
    </>
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
