import { useNavigate } from 'react-router-dom';
import { FollowCountProps } from '@/types/types';
import { FlexCenter, MarginAuto } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

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
          className={cx(
            MarginAuto,
            index === icons.length - 1 ? 'lastStat' : ''
          )}
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
  flex-direction: row;
  background-color: var(--colors-tertiary);
  border-radius: 16px;
`;

const Stat = styled.div`
  text-align: center;
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
