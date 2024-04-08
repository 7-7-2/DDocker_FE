import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import ProfileDetail from '@/components/profile/ProfileDetail';
import FollowCount from '@/components/profile/FollowCount';
import PostsGrid from '@/components/profile/PostsGrid';
import EmptyPostGrid from '@/components/profile/EmptyPostGrid';
import AnonymousUserCard from '@/components/profile/AnonymousUserCard';
import ModalCTA from '@/components/common/ModalCTA';

import { UserProfileDataTypes } from '@/types/types';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { getProfilePostIQParam } from '@/hooks/useInfiniteScroll';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { BUTTON_TEXTS, MODAL_CTA_TEXTS } from '@/constants/common';
import { PROFILE_TEXTS } from '@/constants/profile';
import { isModalState } from '@/atoms/atoms';

import { Between, Column } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const { profile } = PROFILE_TEXTS;
const { signIn2 } = BUTTON_TEXTS;
const { signIn } = MODAL_CTA_TEXTS;

const Profile = () => {
  useComposeHeader(true, '', 'icons');
  const { userId: profileId } = useParams();
  const { userId } = useCachedUserInfo();
  const isModal = useRecoilValue(isModalState);
  const goToSignIn = useNavigateTo('/start/1');

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

  return profileId !== 'Non-members' ? (
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
