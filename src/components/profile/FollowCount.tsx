import { FollowCountProps } from '@/types/types';
import { FlexCenter } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { useNavigate } from 'react-router-dom';

const FollowCount: React.FC<FollowCountProps> = ({ icons }) => {
  const navigate = useNavigate();

  const handleStatClick = (label: string) => {
    label === '게시물'
      ? console.log('1')
      : (label === '팔로잉' || label === '팔로워') && navigate('/FOLLOW');
  };
  return (
    <Container className={FlexCenter}>
      {icons.map((icon, index) => (
        <Stat
          key={index}
          className={index === icons.length - 1 ? 'lastStat' : ''}
          onTouchEnd={() => handleStatClick(icon.label)}>
          <StatNumber>{icon.number}</StatNumber>
          <StatLabel>{icon.label}</StatLabel>
        </Stat>
      ))}
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
