import { FOLLOW } from '@/constants/Follow';
import { Flex, FlexCenter } from '@/styles/layout';
import { styled } from 'styled-system/jsx';

const FollowCount = () => {
  return (
    <Container className={FlexCenter}>
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
    </Container>
  );
};

export default FollowCount;

const Container = styled.div`
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
  padding: 0px 25px;
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
