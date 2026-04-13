import { lazy, Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import ActionModal from '@/components/common/ActionModal';
import Icon from '@/components/common/Icon';

const EmptyPostGrid = lazy(() => import('@/components/profile/EmptyPostGrid'));
const PostsGrid = lazy(() => import('@/components/profile/PostsGrid'));
const FollowCount = lazy(() => import('@/components/profile/FollowCount'));
const ProfileDetail = lazy(() => import('@/components/profile/ProfileDetail'));

import useGetUserInfo from '@/hooks/useGetUserInfo';
import { getProfilePostIQParam } from '@/hooks/useInfiniteScroll';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { useComposeHeader } from '@/hooks/useComposeHeader';

import { getPostCounts } from '@/api/user';
import { isModalState, userInfoState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { InfinitePosts, UserProfileDataTypes } from '@/types/types';
import { BUTTON_TEXTS, HEADER_TEXTS } from '@/constants/common';
import { PROFILE_TEXTS } from '@/constants/profile';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex } from '@/styles/layout';
import { useSharePage } from '@/hooks/useSharePage';
import { Medium } from '@/styles/styles';

const { profile } = PROFILE_TEXTS;

const MemberProfile = ({
  userId,
  profileId
}: {
  userId: string;
  profileId: string | undefined;
}) => {
  useGetUserInfo(profileId);
  const { nickname: profileNickname } = useRecoilValue(userInfoState);
  const myProfile = userId === profileId;

  const headerContent = myProfile
    ? ['back', HEADER_TEXTS.profile.MyProfile, 'icons']
    : ['back', profileNickname, 'action'];
  useComposeHeader(...headerContent);

  const isModal = useRecoilValue(isModalState);
  const handleShare = useSharePage();
  const handleReport = () => {
    console.log('계정신고');
  };

  const [viewTypsState, setViewTypeState] = useState('grid');
  const ProfilePostIQParam: InfinitePosts =
    getProfilePostIQParam(viewTypsState);
  const {
    data,
    ref: postRef,
    refetch
  } = useTargetInfiniteScroll(ProfilePostIQParam, profile);
  const postsData = data && (data as unknown as UserProfileDataTypes[]);

  const { data: allCount, isLoading } = useQuery({
    queryKey: ['postCount', userId],
    queryFn: () => {
      return getPostCounts(userId);
    }
  });

  const followCountData = {
    userId: profileId,
    postCount: allCount
  };

  return (
    <>
      {isModal && (
        <ActionModal>
          <ActionModalItem
            className={cx(Flex, Align)}
            onClick={handleReport}>
            <Icon {...iconPropsGenerator('report')} />
            <span className={Medium}>{BUTTON_TEXTS.userReport}</span>
          </ActionModalItem>
          <ActionModalItem
            className={cx(Flex, Align)}
            onClick={handleShare}>
            <Icon {...iconPropsGenerator('share')} />
            <span className={Medium}>{BUTTON_TEXTS.profileShare}</span>
          </ActionModalItem>
        </ActionModal>
      )}
      <Container className={Column}>
        <div className={cx(Column, Between)}>
          <Suspense>
            <ProfileDetail userId={profileId} />
            <FollowCount data={followCountData} />
          </Suspense>
        </div>
        {!isLoading && allCount !== 0 ? (
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
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: auto;
  margin-top: 20px;
  gap: 20px;
`;

const ActionModalItem = styled.button`
  gap: 12px;
  font-size: var(--font-sizes-base);
  line-height: 24px;
`;

export default MemberProfile;
