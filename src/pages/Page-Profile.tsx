import FollowCount from '@/components/profile/FollowCount';
import PostsGrid from '@/components/profile/PostsGrid';
import ProfileDetail from '@/components/profile/ProfileDetail';
import ProfileImg from '@/components/profile/ProfileImg';
import { FOLLOW } from '@/constants/Follow';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { Between, Column } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

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
        <div className={cx(Column, Between)}>
          <ProfileImg />
          <ProfileDetail />
          <FollowCount icons={icons} />
        </div>
      </Container>
      <PostsGrid />
    </>
  );
};

const Container = styled.div`
  position: relative;
  gap: 4px;
  width: auto;
  margin: 20px 32px;
  font-size: var(--font-sizes-xs);
`;

export default Profile;
