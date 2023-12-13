import PostsGrid from '@/components/profile/PostsGrid';
import ProfileDetail from '@/components/profile/ProfileDetail';
import ProfileImg from '@/components/profile/ProfileImg';
import Follow from '@/pages/Page-Follow';
import { styled } from 'styled-system/jsx';
import { Flex, FlexCenter } from '@/styles/layout';
import Header from '@/components/common/Header';
import HeaderIcons from '@/components/common/HeaderIcons';
import { FOLLOW } from '@/constants/Follow';

const Profile = () => {
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
          <CountContainer className={FlexCenter}>
            <Stat className={Flex}>
              <StatNumber>{FOLLOW.post}</StatNumber>
              <StatLabel>게시물</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>{FOLLOW.following}</StatNumber>
              <StatLabel>팔로잉</StatLabel>
            </Stat>
            <Stat className="lastStat">
              <StatNumber>{FOLLOW.followed}</StatNumber>
              <StatLabel>팔로워</StatLabel>
            </Stat>
          </CountContainer>
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

const CountContainer = styled.div`
  width: 335px;
  height: 74px;
  padding: 20px;
  margin-bottom: 20px;
  flex-direction: row;
  background-color: #f5f5f5;
  border-radius: 16px;
`;

const Stat = styled.div`
  text-align: center;
  margin: auto;
  padding-left: 30px;
  padding-right: 20px;
  flex-direction: column;
  border-right: 1px solid #dbdbdb;
  &.lastStat {
    border-right: none;
  }
`;

const StatLabel = styled.li`
  font-weight: 400;
  font-size: var(--font-sizes-xs);
  margin: 0px 10px;
  list-style-type: none;
`;

const StatNumber = styled.li`
  font-size: var(--font-sizes-base);
  font-weight: 600;
  margin: 0px 18px;
  list-style-type: none;
`;

const Border = styled.div`
  border-bottom: 1px solid #e6e4e4;
`;
