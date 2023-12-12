import { useComposeHeader } from '@/hooks/useComposeHeader';
import { FOLLOW } from '@/constants/Follow';
import { styled } from 'styled-system/jsx';
import { Flex, FlexCenter } from '@/styles/layout';

const Follow = () => {
  useComposeHeader(false, '커피좋아', '');

  return (
    <Container className={FlexCenter}>
      <Stat className={Flex}>
        <StatLabel>팔로잉</StatLabel>
        <StatLabel>팔로워</StatLabel>
      </Stat>
      <Stat className={Flex}>
        <StatNumber>{FOLLOW.following}</StatNumber>
        <StatNumber>{FOLLOW.followed}</StatNumber>
      </Stat>
    </Container>
  );
};

const Container = styled.div`
  justify-content: space-around;
  padding: 20px;
  width: 200px;
  align-items: center;
  flex-direction: column;
`;

const Stat = styled.div`
  text-align: center;
  flex-direction: row;
`;

const StatLabel = styled.span`
  font-weight: bold;
  margin: 0px 10px;
`;

const StatNumber = styled.span`
  font-size: 0.8rem;
  margin: 0px 18px;
`;

export default Follow;
