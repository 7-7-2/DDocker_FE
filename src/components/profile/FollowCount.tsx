import { useNavigateTo } from '@/hooks/useNavigateTo';
import { FollowCountProps } from '@/types/types';
import { Center, Column, Flex, MarginAuto } from '@/styles/layout';
import { Border16, Cursor, RecentSearch, SumType } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const FollowCount: React.FC<FollowCountProps> = ({ icons }) => {
  const navigate = useNavigateTo('/FOLLOW');

  const handleStatClick = (label: string) => {
    label === '게시물'
      ? null
      : (label === '팔로잉' || label === '팔로워') && navigate();
  };

  return (
    <Container className={cx(Flex, Cursor, Border16)}>
      {icons.map((icon, index) => (
        <Stat
          key={index}
          className={cx(
            Center,
            Column,
            MarginAuto,
            index === icons.length - 1 ? 'lastStat' : ''
          )}
          onTouchEnd={() => handleStatClick(icon.label)}>
          <StatNumber className={RecentSearch}>{icon.number}</StatNumber>
          <StatLabel className={SumType}>{icon.label}</StatLabel>
        </Stat>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  height: 74px;
  padding: 20px;
  background-color: var(--colors-tertiary);
`;
const Stat = styled.div`
  padding: 0px 39px;
  border-right: 1px solid #dbdbdb;
  &.lastStat {
    border-right: none;
  }
`;
const StatNumber = styled.li`
  list-style-type: none;
`;
const StatLabel = styled.li`
  list-style-type: none;
`;
export default FollowCount;
