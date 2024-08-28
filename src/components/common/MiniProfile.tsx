import ImgContainer from '@/components/common/ImgContainer';
import { TEXT } from '@/constants/texts';
import { MiniProfileProps } from '@/types/types';
import { Between, Column, Flex, FlexCenter, Justify } from '@/styles/layout';
import {
  LineH18,
  Semibold,
  MiniUserTitle,
  PostsUserContainer
} from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import NoProfileImg from '@/components/common/NoProfileImg';
import { useLocation } from 'react-router-dom';

const MiniProfile = ({
  url,
  nickname,
  caffeine,
  userId,
  post = false,
  mini = false
}: MiniProfileProps) => {
  const toProfilePage = useNavigateTo(`/profile/${userId}`);
  const { pathname } = useLocation();
  const postsTitle = pathname.startsWith('/post');
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
        <div
          className={
            post && postsTitle
              ? cx(Column, Between, PostsUserContainer)
              : cx(Column, Justify)
          }>
          <UserTitle
            className={
              post && postsTitle
                ? cx(LineH18, Semibold)
                : cx(LineH18, Semibold, MiniUserTitle)
            }>
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
  color: var(--colors-main-dark);
`;

const UserCaffeine = styled.div`
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
  cursor: pointer;
`;

export default MiniProfile;
