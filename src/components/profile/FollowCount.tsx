import { useNavigateTo } from '@/hooks/useNavigateTo';
import { FollowCountProps } from '@/types/types';
import { Align, Column, FlexCenter, MarginAuto } from '@/styles/layout';
import {
  Semibold,
  Border16,
  Cursor,
  LineH18,
  TextBlack,
  TextGray
} from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const FollowCount: React.FC<FollowCountProps> = ({ icons }) => {
  const navigate = useNavigateTo('/FOLLOW');

  const handleStatClick = (label: string) => {
    label === '게시물'
      ? () => {
          console.log('1');
        }
      : (label === '팔로잉' || label === '팔로워') && navigate();
  };

  return (
    <Container className={cx(FlexCenter, Cursor, Border16)}>
      {icons.map((icon, index) => (
        <Stat
          key={index}
          className={cx(
            Align,
            Column,
            MarginAuto,
            LineH18,
            index === icons.length - 1 ? 'lastStat' : ''
          )}
          onTouchEnd={() => handleStatClick(icon.label)}>
          <StatNumber className={cx(TextBlack, Semibold)}>
            {icon.number}
          </StatNumber>
          <StatLabel className={cx(TextGray, LineH18)}>{icon.label}</StatLabel>
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
  padding: 0px 25px;
  border-right: 1px solid #dbdbdb;
  &.lastStat {
    border-right: none;
  }
`;
const StatNumber = styled.li`
  font-size: var(--font-sizes-base);
  margin: 0px 18px;
  list-style-type: none;
`;
const StatLabel = styled.li`
  font-size: var(--font-sizes-xs);
  margin: 0px 10px;
  list-style-type: none;
`;
export default FollowCount;
