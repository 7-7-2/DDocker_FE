import { lazy, Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

const Tabs = lazy(() => import('@/components/common/Tabs'));
const ProfileModal = lazy(() => import('@/components/profile/ProfileModal'));
const StandardAccountPosts = lazy(
  () => import('@/components/profile/StandardAccountPosts')
);
const ProfileDetail = lazy(() => import('@/components/profile/ProfileDetail'));
const FollowCount = lazy(() => import('@/components/profile/FollowCount'));
const PrivateAccountPosts = lazy(
  () => import('@/components/profile/PrivateAccountPosts')
);

import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useSharePage } from '@/hooks/useSharePage';

import { getPostCounts } from '@/api/user';
import { isModalState, userInfoState } from '@/atoms/atoms';
import { HEADER_TEXTS } from '@/constants/common';
import { PROFILE_TEXTS } from '@/constants/profile';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Column } from '@/styles/layout';

const { profileTabs, type } = PROFILE_TEXTS;

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
  const [viewTypeState, setViewTypeState] = useState('grid');
  const handleSelectTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value);
    setViewTypeState(
      e.currentTarget.value === profileTabs[0] ? type[0] : type[1]
    );
  };

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
        <Suspense>
          <ProfileModal
            handleReport={handleReport}
            handleShare={handleShare}
          />
        </Suspense>
      )}
      <Container className={Column}>
        <div className={cx(Column, Between)}>
          <Suspense>
            <ProfileDetail userId={profileId} />
            <FollowCount data={followCountData} />
          </Suspense>
        </div>
        <PostsContiner className={Column}>
          <Suspense>
            <Tabs
              tabs={profileTabs}
              selectedTab={selectedTab}
              handleButtonClick={handleSelectTab}
              disabled={!myProfile && visibility === 0}
            />
          </Suspense>
          {!myProfile && visibility === 0 ? (
            <Suspense>
              <PrivateAccountPosts />
            </Suspense>
          ) : (
            <Suspense>
              <StandardAccountPosts
                type={viewTypeState}
                myProfile={myProfile}
                isLoading={isLoading}
              />
            </Suspense>
          )}
        </PostsContiner>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 22px;
  height: 100%;
  gap: 10px;
`;

const PostsContiner = styled.div`
  flex-grow: 1;
`;

export default MemberProfile;
