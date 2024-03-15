import Icon from '@/components/common/Icon';
import ImgContainer from '@/components/common/ImgContainer';
import { TEXT } from '@/constants/texts';
import { MiniProfile } from '@/types/types';
import { Column, Flex, FlexCenter, Justify } from '@/styles/layout';
import { LineH18, Semibold } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const MiniProfile = ({ url, nickname, caffeine, onClick }: MiniProfile) => {
  return (
    <>
      {url && (
        <Container className={Flex}>
          <div
            className={FlexCenter}
            onClick={onClick}>
            <ImgContainer url={url} />
          </div>
          <div className={cx(Column, Justify)}>
            <UserTitle className={cx(LineH18, Semibold)}>
              <span onClick={onClick}>{nickname}</span>
            </UserTitle>
            <UserCaffeine
              className={cx(Flex, LineH18)}
              onClick={
                onClick
              }>{`${TEXT.addedcaffeine} ${caffeine} ${TEXT.mgLabel}`}</UserCaffeine>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  gap: 12px;
`;
const UserTitle = styled.div`
  font-size: var(--font-sizes-sm);
`;
const UserCaffeine = styled.div`
  font-size: var(--font-sizes-xs);
  color: #767676;
`;

export default MiniProfile;
