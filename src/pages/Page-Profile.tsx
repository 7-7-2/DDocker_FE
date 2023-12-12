import PostsGrid from '@/components/profile/PostsGrid';
import ProfileDetail from '@/components/profile/ProfileDetail';
import ProfileImg from '@/components/profile/ProfileImg';
import Follow from '@/pages/Page-Follow';
import { styled } from 'styled-system/jsx';
import { Flex, Full, PY } from '@/styles/layout';
import { cx } from 'styled-system/css';

const Profile = () => {
  return (
    <>
      <Container className={cx(Flex, PY)}>
        <Wrapper>
          <ProfileHeader>
            <ProfileImg />
            <Follow />
          </ProfileHeader>
        </Wrapper>
        <ProfileDetail />
      </Container>
      <Border className={Full} />
      <PostsGrid />
    </>
  );
};

export default Profile;

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  gap: 4px;
  width: auto;
  margin: 0px 32px;
  flex-direction: column;
  font-size: var(--font-sizes-xs);
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Border = styled.div`
  border-top: 1px solid #e6e4e4;
  display: flex;
  padding-top: 10px;
`;
