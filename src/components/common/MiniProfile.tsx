import ImgContainer from '@/components/common/ImgContainer';
import { TEXT } from '@/constants/texts';
import { MiniProfileProps } from '@/types/types';
import { Column, Flex, FlexCenter, Justify } from '@/styles/layout';
import { LineH18, Semibold } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import NoProfileImg from '@/components/common/NoProfileImg';

const MiniProfile = ({
  url,
  nickname,
  caffeine,
  userId,
  post = false,
  mini = false
}: MiniProfileProps) => {
  const toProfilePage = useNavigateTo(`/profile/${userId}`);
  return (
    <>
      <Container className={Flex}>
        <div
          className={FlexCenter}
          onClick={toProfilePage}>
          {url && (
            <ImgContainer
              url={url}
              post={post}
              mini={mini}
            />
          )}
          {!url && (
            <NoProfileImg
              mini={mini}
              post={post}
            />
          )}
        </div>
        <div className={cx(Column, Justify)}>
          <UserTitle className={cx(LineH18, Semibold)}>
            <span onClick={toProfilePage}>{nickname}</span>
          </UserTitle>
          <UserCaffeine
            className={cx(Flex, LineH18)}
            onClick={
              toProfilePage
            }>{`${TEXT.addedcaffeine} ${caffeine} ${TEXT.mgLabel}`}</UserCaffeine>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  gap: 12px;
`;
const UserTitle = styled.div`
  font-size: var(--font-sizes-sm);
  color: var(--colors-main-dark);
`;
const UserCaffeine = styled.div`
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
  cursor: pointer;
`;

export default MiniProfile;
