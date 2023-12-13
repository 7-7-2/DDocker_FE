import PostsGrid from '@/components/profile/PostsGrid';
import ProfileDetail from '@/components/profile/ProfileDetail';
import ProfileImg from '@/components/profile/ProfileImg';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import Header from '@/components/common/Header';
import HeaderIcons from '@/components/common/HeaderIcons';
import FollowCount from '@/components/profile/FollowCount';
import { FOLLOW } from '@/constants/Follow';

const Profile = () => {
  const icons = [
    { number: FOLLOW.post, label: '게시물' },
    { number: FOLLOW.following, label: '팔로잉' },
    { number: FOLLOW.followed, label: '팔로워' }
  ];

  return (
    <>
      <Header
        logo={<>APPLOGO</>}
        icons={<HeaderIcons />}
      />
      <Container className={Flex}>
        <ProfileHeader className={Flex}>
          <ProfileImg />
          <ProfileDetail />

          <FollowCount icons={icons} />
        </ProfileHeader>
      </Container>
      <PostsGrid />
    </>
  );
};

export default Profile;

const Container = styled.div`
  position: relative;
  gap: 4px;
  width: auto;
  margin: 20px 32px;
  flex-direction: column;
  font-size: var(--font-sizes-xs);
`;

const ProfileHeader = styled.div`
  flex-direction: column;
  justify-content: space-between;
`;
