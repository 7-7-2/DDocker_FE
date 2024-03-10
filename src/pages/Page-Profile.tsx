import { useParams } from 'react-router-dom';

import FollowCount from '@/components/profile/FollowCount';
import PostsGrid from '@/components/profile/PostsGrid';
import ProfileDetail from '@/components/profile/ProfileDetail';
import { InfinitePosts, UserProfileDataTypes } from '@/types/types';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { getProfilePostIQParam } from '@/hooks/useInfiniteScroll';
import { useComposeHeader } from '@/hooks/useComposeHeader';

import { Between, Column } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const Profile = () => {
  useComposeHeader(true, '', 'icons');
  const { userId } = useParams();

  const ProfilePostIQParam: InfinitePosts = getProfilePostIQParam();
  const { data, ref } = useTargetInfiniteScroll(ProfilePostIQParam);

  const postsData = data as unknown as UserProfileDataTypes[];

  const followCountData = {
    userId: userId,
    postCount: postsData && postsData[0].allCount
  };

  return (
    <>
      <Container className={Column}>
        <div className={cx(Column, Between)}>
          <ProfileDetail userId={userId} />
          <FollowCount data={followCountData} />
        </div>
      </Container>
      <PostsGrid data={postsData} />
      <Target ref={ref} />
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: auto;
  margin: 20px 0;
`;
const Target = styled.div`
  width: 1px;
`;

export default Profile;
