import Icon from '@/components/common/Icon';
import ImgContainer from '@/components/common/ImgContainer';
import { TEXT } from '@/constants/texts';
import { SimplifyUser } from '@/types/types';
import { Column, Flex, FlexCenter, Justify } from '@/styles/layout';
import { LineH18, Semibold } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const MiniProfile: React.FC<SimplifyUser> = ({ url, nickname, caffeine }) => {
  return (
    <>
      {url && (
        <Container className={Flex}>
          <div className={FlexCenter}>
            <ImgContainer url={url} />
          </div>
          <div className={cx(Column, Justify)}>
            <UserTitle className={cx(LineH18, Semibold)}>{nickname}</UserTitle>
            <UserCaffeine
              className={cx(
                Flex,
                LineH18
              )}>{`${TEXT.addedcaffeine} ${caffeine} ${TEXT.mgLabel}`}</UserCaffeine>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  gap: 12px;
`;
const UserTitle = styled.span`
  font-size: var(--font-sizes-sm);
`;
const UserCaffeine = styled.span`
  font-size: var(--font-sizes-xs);
  color: #767676;
`;

export default MiniProfile;
