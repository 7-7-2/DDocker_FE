import { lazy, Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import ActionModal from '@/components/common/ActionModal';
import Icon from '@/components/common/Icon';
import Tabs from '@/components/common/Tabs';

const ProfileDetail = lazy(() => import('@/components/profile/ProfileDetail'));
const FollowCount = lazy(() => import('@/components/profile/FollowCount'));
const PostsGrid = lazy(() => import('@/components/profile/PostsGrid'));
const PostsList = lazy(() => import('@/components/profile/PostsList'));
const EmptyPostGrid = lazy(() => import('@/components/profile/EmptyPostGrid'));
const PrivateAccountPostGrid = lazy(
  () => import('@/components/profile/PrivateAccountPostGrid')
);

import useGetUserInfo from '@/hooks/useGetUserInfo';
import { getProfilePostIQParam } from '@/hooks/useInfiniteScroll';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useSharePage } from '@/hooks/useSharePage';

import { getPostCounts } from '@/api/user';
import { isModalState, userInfoState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { InfinitePosts, UserProfileListDataTypes } from '@/types/types';
import { BUTTON_TEXTS, HEADER_TEXTS } from '@/constants/common';
import { PROFILE_TEXTS } from '@/constants/profile';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex } from '@/styles/layout';
import { Medium } from '@/styles/styles';

const { profile, profileTabs } = PROFILE_TEXTS;

const MemberProfile = ({
  userId,
  profileId
}: {
  userId: string;
  profileId: string | undefined;
}) => {
  //USER INFO
  useGetUserInfo(profileId);
  const { nickname: profileNickname, visibility } =
    useRecoilValue(userInfoState);
  const myProfile = userId === profileId;

  // HRADER
  const headerContent = myProfile
    ? ['', HEADER_TEXTS.profile.MyProfile, 'icons']
    : ['back', profileNickname, 'action'];
  useComposeHeader(...headerContent);

  // ACTION BUTTON
  const isModal = useRecoilValue(isModalState);
  const handleShare = useSharePage();
  const handleReport = () => {
    console.log('계정신고');
  };

  //TABS
  const [selectedTab, setSelectedTab] = useState(profileTabs[0]);
  const handleSelectTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value);
    setViewTypeState('list');
  };

  // IMG POSTS
  const [viewTypeState, setViewTypeState] = useState('grid');
  const ProfilePostIQParam: InfinitePosts =
    getProfilePostIQParam(viewTypeState);
  const {
    data: postsData,
    ref: postRef,
    refetch
  } = useTargetInfiniteScroll(ProfilePostIQParam, profile);
  const allpostsData = postsData as UserProfileListDataTypes[];
  const imgPostData = postsData?.filter(item => item.photo);
  const { data: allCount, isLoading } = useQuery({
    queryKey: ['postCount', profileId],
    queryFn: () => {
      return profileId && getPostCounts(profileId);
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
        {!myProfile && visibility === 0 ? (
          <Suspense>
            <PrivateAccountPostGrid />
          </Suspense>
        ) : !isLoading && allCount !== 0 ? (
          <Suspense>
            <PostsContiner>
              <Tabs
                tabs={profileTabs}
                selectedTab={selectedTab}
                handleButtonClick={handleSelectTab}
              />
              {profileTabs[0] === selectedTab ? (
                <PostsGrid
                  data={imgPostData}
                  postRef={postRef}
                  refetch={refetch}
                />
              ) : (
                <PostsList data={allpostsData} />
              )}
            </PostsContiner>
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
  padding-top: 22px;
  height: 100%;
  gap: 10px;
`;

const PostsContiner = styled.div``;

const ActionModalItem = styled.button`
  gap: 12px;
  font-size: var(--font-sizes-base);
  line-height: 24px;
`;

export default MemberProfile;
