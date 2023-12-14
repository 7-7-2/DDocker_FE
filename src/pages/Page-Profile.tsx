import FollowCount from '@/components/profile/FollowCount';
import PostsGrid from '@/components/profile/PostsGrid';
import ProfileDetail from '@/components/profile/ProfileDetail';
import ProfileImg from '@/components/profile/ProfileImg';
import { FOLLOW } from '@/constants/Follow';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { Column } from '@/styles/layout';
import { styled } from 'styled-system/jsx';

const Profile = () => {
  useComposeHeader(true, '', 'icons');
  const icons = [
    { number: FOLLOW.post, label: '게시물' },
    { number: FOLLOW.following, label: '팔로잉' },
    { number: FOLLOW.followed, label: '팔로워' }
  ];

  return (
    <>
      <Container className={Column}>
        <ProfileHeader className={Column}>
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
  font-size: var(--font-sizes-xs);
`;

const ProfileHeader = styled.div`
  justify-content: space-between;
`;
