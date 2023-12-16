import { useState } from 'react';
import EmptyUser from '@/components/follow/EmptyUser';
import UserListItem from '@/components/follow/UserListItem';
import { TEXT } from '@/constants/texts';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { FollowCountProps, SimplifyUser } from '@/types/types';
import { Column, FlexCenter, Flex } from '@/styles/layout';
import { TextGray, ToggleButton } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const Follow: React.FC<FollowCountProps> = () => {
  useComposeHeader(false, '커피좋아', '');
  const [isActiveBtn, setIsActiveBtn] = useState('팔로워');

  const handleButtonClick = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsActiveBtn(e.currentTarget?.value || '팔로워');
  };

  const followers: SimplifyUser[] = [
    // {
    //   userId: 'asd',
    //   NickName: '커피마셔마셔',
    //   caffeine: 34054
    // },
    // {
    //   userId: 'zxc',
    //   NickName: '커피안마셔안마셔',
    //   caffeine: 12345
    // }
  ];

  const followings: SimplifyUser[] = [
    // {
    //   userId: 'zxc',
    //   NickName: '커피안마셔안마셔',
    //   caffeine: 12345
    // },
    // {
    //   userId: 'asd',
    //   NickName: '커피마셔마셔',
    //   caffeine: 34054
    // }
  ];

  const usersToShow = isActiveBtn === '팔로워' ? followers : followings;

  //   const userId: string = 'exampleUserId'; // useParams 를 위한 것

  const handleMoveBtn = useNavigateTo('/search');
  return (
    <>
      <Container className={cx(FlexCenter, Column)}>
        <ToggleArea className={cx(Flex)}>
          <button
            className={cx(
              ToggleButton,
              FlexCenter,
              isActiveBtn === '팔로워' && 'active'
            )}
            onTouchEnd={handleButtonClick}
            value="팔로워">
            {TEXT.toggleFollowedBtn}
          </button>
          <button
            className={cx(
              ToggleButton,
              FlexCenter,
              TextGray,
              isActiveBtn === '팔로잉' && 'active'
            )}
            onTouchEnd={handleButtonClick}
            value="팔로잉">
            {TEXT.toggleFollowingBtn}
          </button>
        </ToggleArea>
      </Container>

      {usersToShow.length > 0 && <UserListItem users={usersToShow} />}
      {isActiveBtn === '팔로워' && !usersToShow.length && (
        <EmptyUser label="팔로워" />
      )}
      {isActiveBtn === '팔로잉' && !usersToShow.length && (
        <EmptyUser
          label="팔로잉"
          onTouchEnd={handleMoveBtn}
        />
      )}
    </>
  );
};

const Container = styled.div`
  margin-top: 17px;
`;
const ToggleArea = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
`;

export default Follow;
